import http.server
import socketserver
import socket
import webbrowser
import os
import sys
from datetime import datetime

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        print(f"[{datetime.now().strftime('%H:%M:%S')}] {format % args}")

def print_banner(ip, port):
    print("\n" + "="*60)
    print("  🚀 KIVUCODE SOLUTIONS - SERVEUR LOCAL")
    print("="*60)
    print(f"\n  📱 Accès depuis le téléphone (même Wi-Fi) :")
    print(f"  ➜  http://{ip}:{port}/")
    print(f"\n  💻 Accès depuis l'ordinateur :")
    print(f"  ➜  http://localhost:{port}/")
    print(f"  ➜  http://127.0.0.1:{port}/")
    print("\n" + "="*60)
    print("  ⚠️  Conditions requises :")
    print("  • Téléphone et PC sur le MÊME Wi-Fi")
    print("  • Désactiver le VPN sur le téléphone")
    print("="*60)
    print("\n  🔄 Appuyez sur CTRL+C pour arrêter le serveur\n")

def main():
    os.chdir(DIRECTORY)
    ip = get_local_ip()
    print_banner(ip, PORT)
    
    try:
        webbrowser.open(f"http://localhost:{PORT}")
        print("  🌐 Navigateur ouvert automatiquement\n")
    except:
        pass
    
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), CustomHandler) as httpd:
            print("  ✅ Serveur démarré avec succès !\n")
            print("="*60 + "\n")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n  ⏹️ Serveur arrêté")
        sys.exit(0)
    except Exception as e:
        print(f"\n  ❌ Erreur : {e}")

if __name__ == "__main__":
    main()