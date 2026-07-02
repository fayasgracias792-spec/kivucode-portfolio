// ============================================================
// KIVUCODE SOLUTIONS - JAVASCRIPT PREMIUM
// ============================================================

'use strict';

// ============================================================
// 1. INITIALISATION GLOBALE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCustomCursor();
    initNavbar();
    initMobileMenu();
    initTypingEffect();
    initHeroParticles();
    initCounters();
    initScrollReveal();
    initActiveNavLink();
    initTechMarquee();
    initFAQ();
    initContactForm();
    initNewsletterForm();
    initBackToTop();
    initSmoothScroll();
    initParallaxEffect();
    
    console.log('%c🚀 KivuCode Solutions %cSite Premium', 
        'color: #3b82f6; font-size: 1.2rem; font-weight: bold;', 
        'color: #cbd5e1;');
    console.log('%c📧 fayasgracias792@gmail.com %c| %c📱 +243 832 287 305', 
        'color: #60a5fa;', 'color: #cbd5e1;', 'color: #60a5fa;');
});

// ============================================================
// 2. LOADER
// ============================================================
function initLoader() {
    const loader = document.getElementById('loader');
    
    // Simuler un chargement fluide
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
            
            // Supprimer le loader du DOM après l'animation
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    });
    
    // Fallback si la page met trop de temps
    setTimeout(() => {
        if (!loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
        }
    }, 3000);
}

// ============================================================
// 3. CURSEUR PERSONNALISÉ
// ============================================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Curseur principal (suivi instantané)
        cursor.style.left = mouseX - 4 + 'px';
        cursor.style.top = mouseY - 4 + 'px';
    });
    
    // Animation fluide du follower
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursorFollower.style.left = cursorX - 20 + 'px';
        cursorFollower.style.top = cursorY - 20 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Effet hover sur les éléments interactifs
    const hoverElements = document.querySelectorAll(
        'a, button, .btn, input, textarea, .service-card, .portfolio-card, .faq-question, .hamburger'
    );
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover');
            cursor.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover');
            cursor.style.transform = 'scale(1)';
        });
    });
    
    // Cacher le curseur quand il quitte la fenêtre
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
}

// ============================================================
// 4. NAVBAR SCROLL EFFECT
// ============================================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Vérifier la position initiale
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
}

// ============================================================
// 5. MENU MOBILE
// ============================================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = navLinks.querySelectorAll('a');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
        
        // Empêcher le scroll quand le menu est ouvert
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });
    
    // Fermer le menu au clic sur un lien
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// ============================================================
// 6. EFFET TYPING
// ============================================================
function initTypingEffect() {
    const words = [
        'React.js',
        'Node.js',
        'Flutter',
        'Laravel',
        'Next.js',
        'Vue.js',
        'TypeScript',
        'Docker',
        'AWS',
        'Firebase'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? 40 : 100;
        
        // Fin de frappe du mot
        if (!isDeleting && charIndex === currentWord.length) {
            isWaiting = true;
            speed = 2000; // Pause avant suppression
            isDeleting = true;
        }
        
        // Fin de suppression
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            isWaiting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 400; // Pause avant nouveau mot
        }
        
        setTimeout(typeEffect, speed);
    }
    
    // Démarrer après un court délai
    setTimeout(typeEffect, 500);
}

// ============================================================
// 7. PARTICULES DU HERO
// ============================================================
function initHeroParticles() {
    const particlesContainer = document.getElementById('heroParticles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        
        // Styles aléatoires
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.3 + 0.1;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(59, 130, 246, ${opacity});
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: particleFloat ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Ajouter l'animation keyframes dynamiquement
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.2;
            }
            25% {
                transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * -30}px) scale(1.5);
                opacity: 0.5;
            }
            50% {
                transform: translate(${Math.random() * -20 + 10}px, ${Math.random() * -20}px) scale(1);
                opacity: 0.3;
            }
            75% {
                transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 30}px) scale(0.8);
                opacity: 0.1;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// ============================================================
// 8. COMPTEURS ANIMÉS
// ============================================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number, .hero-stat-number');
    let countersAnimated = new Set();
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        if (!target || countersAnimated.has(counter)) return;
        
        countersAnimated.add(counter);
        
        let current = 0;
        const duration = 2000; // 2 secondes
        const startTime = performance.now();
        
        function updateCounter(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing ease-out
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            current = Math.floor(easedProgress * target);
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Observer pour déclencher l'animation quand visible
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    // Fallback pour les compteurs déjà visibles
    setTimeout(() => {
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateCounter(counter);
            }
        });
    }, 1000);
}

// ============================================================
// 9. SCROLL REVEAL (Intersection Observer)
// ============================================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .testimonial-card, .why-us-feature, .tech-item'
    );
    
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Ajouter un délai basé sur l'attribut data-delay
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, parseInt(delay));
                    
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        }
    );
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // Révélation des sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    sectionObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.8s ease';
        sectionObserver.observe(section);
    });
}

// ============================================================
// 10. NAVIGATION ACTIVE LINK
// ============================================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
        
        // Si on est tout en haut, activer Accueil
        if (window.scrollY < 300) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
}

// ============================================================
// 11. TECH MARQUEE (Carrousel infini)
// ============================================================
function initTechMarquee() {
    const techTrack = document.getElementById('techTrack');
    if (!techTrack) return;
    
    const technologies = [
        { name: 'React', icon: 'icons/react.svg', isImage: true },
        { name: 'Node.js', icon: 'icons/node.svg', isImage: true },
        { name: 'Flutter', icon: 'icons/flutter.svg', isImage: true },
        { name: 'Docker', icon: 'icons/docker.svg', isImage: true },
        { name: 'AWS', icon: 'icons/aws.svg', isImage: true },
        { name: 'MongoDB', icon: 'icons/mongodb.svg', isImage: true },
        { name: 'Laravel', icon: 'fa-brands fa-laravel', isImage: false },
        { name: 'PostgreSQL', icon: 'fa-solid fa-database', isImage: false },
        { name: 'Firebase', icon: 'fa-solid fa-fire', isImage: false },
        { name: 'TypeScript', icon: 'fa-brands fa-js', isImage: false },
        { name: 'Next.js', icon: 'fa-brands fa-react', isImage: false },
        { name: 'Vue.js', icon: 'fa-brands fa-vuejs', isImage: false }
    ];
    
    // Créer les éléments
    function createTrackItems() {
        const items = technologies.map(tech => {
            const div = document.createElement('div');
            div.classList.add('tech-track-item');
            
            if (tech.isImage) {
                div.innerHTML = `
                    <img src="${tech.icon}" alt="${tech.name}" width="24" height="24" />
                    <span>${tech.name}</span>
                `;
            } else {
                div.innerHTML = `
                    <i class="${tech.icon}"></i>
                    <span>${tech.name}</span>
                `;
            }
            
            return div;
        });
        
        // Dupliquer pour l'effet infini
        const allItems = [...items, ...items];
        
        allItems.forEach(item => {
            techTrack.appendChild(item);
        });
    }
    
    createTrackItems();
    
    // Pause au survol
    techTrack.addEventListener('mouseenter', () => {
        techTrack.style.animationPlayState = 'paused';
    });
    
    techTrack.addEventListener('mouseleave', () => {
        techTrack.style.animationPlayState = 'running';
    });
}

// ============================================================
// 12. FAQ ACCORDÉON
// ============================================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fermer tous les items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Ouvrir l'item cliqué s'il n'était pas déjà actif
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Accessibilité clavier
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// ============================================================
// 13. FORMULAIRE DE CONTACT
// ============================================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const feedback = document.getElementById('formFeedback');
    const messageCounter = document.querySelector('.form-counter');
    
    // Validation en temps réel
    function validateField(input) {
        if (!input.value.trim()) {
            input.classList.add('error');
            input.classList.remove('valid');
            return false;
        }
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('error');
                input.classList.remove('valid');
                return false;
            }
        }
        
        input.classList.remove('error');
        input.classList.add('valid');
        return true;
    }
    
    // Événements de validation
    [nameInput, emailInput, messageInput].forEach(input => {
        if (!input) return;
        
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
    
    // Compteur de caractères pour le message
    if (messageInput && messageCounter) {
        messageInput.addEventListener('input', () => {
            const length = messageInput.value.length;
            messageCounter.textContent = `${length}/500`;
            
            if (length > 450) {
                messageCounter.style.color = '#f59e0b';
            } else if (length > 490) {
                messageCounter.style.color = '#ef4444';
            } else {
                messageCounter.style.color = '';
            }
        });
    }
    
    // Soumission du formulaire
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Valider tous les champs
        const isNameValid = validateField(nameInput);
        const isEmailValid = validateField(emailInput);
        const isMessageValid = validateField(messageInput);
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            feedback.textContent = 'Veuillez corriger les erreurs ci-dessus.';
            feedback.className = 'form-feedback error';
            feedback.style.display = 'block';
            return;
        }
        
        // État de chargement
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        feedback.style.display = 'none';
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                feedback.textContent = '✅ Message envoyé avec succès ! Nous vous répondrons dans les 24h.';
                feedback.className = 'form-feedback success';
                feedback.style.display = 'block';
                form.reset();
                
                // Réinitialiser les classes de validation
                [nameInput, emailInput, messageInput].forEach(input => {
                    if (input) {
                        input.classList.remove('valid', 'error');
                    }
                });
                
                if (messageCounter) {
                    messageCounter.textContent = '0/500';
                }
            } else {
                throw new Error('Erreur serveur');
            }
        } catch (error) {
            feedback.textContent = '❌ Une erreur est survenue. Veuillez réessayer ou nous contacter directement.';
            feedback.className = 'form-feedback error';
            feedback.style.display = 'block';
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// ============================================================
// 14. NEWSLETTER
// ============================================================
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email) {
            // Animation de secousse
            newsletterForm.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                newsletterForm.style.animation = '';
            }, 500);
            return;
        }
        
        // Simuler l'inscription (à remplacer par votre logique)
        const btn = newsletterForm.querySelector('button');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.style.background = '#10b981';
        emailInput.value = '';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 2000);
    });
}

// Ajouter l'animation shake
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-3px); }
    }
`;
document.head.appendChild(shakeStyle);

// ============================================================
// 15. BACK TO TOP
// ============================================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================================
// 16. DÉFILEMENT FLUIDE POUR LES LIENS D'ANCRAGE
// ============================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorer les liens "#" seuls
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ============================================================
// 17. EFFET PARALLAX LÉGER
// ============================================================
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-dashboard, .why-us-image, .about-image');
    
    function updateParallax() {
        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const windowCenterY = window.innerHeight / 2;
            const offset = (centerY - windowCenterY) * 0.05;
            
            // Limiter l'effet
            const limitedOffset = Math.max(-20, Math.min(20, offset));
            
            el.style.transform = `translateY(${limitedOffset}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
}

// ============================================================
// 18. GESTION DES IMAGES (Lazy Loading)
// ============================================================
function initLazyLoading() {
    // Les images avec loading="lazy" sont gérées nativement par le navigateur
    // Cette fonction ajoute un support pour les navigateurs plus anciens
    
    if ('loading' in HTMLImageElement.prototype) {
        // Le navigateur supporte le lazy loading natif
        return;
    }
    
    // Fallback pour les navigateurs sans support
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        if (!img.src && img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// Initialiser le lazy loading
initLazyLoading();

// ============================================================
// 19. UTILITAIRES
// ============================================================

// Debounce pour les événements fréquents
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle pour limiter la fréquence d'exécution
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Détection du support des préférences de réduction de mouvement
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Désactiver certaines animations
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
    
    // Arrêter les animations CSS
    const animatedElements = document.querySelectorAll('[class*="animation"]');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
    });
}

// ============================================================
// 20. PERFORMANCE - OPTIMISATION DU SCROLL
// ============================================================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Les fonctions liées au scroll sont déjà optimisées avec passive: true
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================================
// 21. DÉTECTION DU MODE SOMBRE (Déjà en dark mode par défaut)
// ============================================================
// Le site est en dark mode par défaut, mais on peut ajouter un toggle
// si nécessaire dans le futur

// ============================================================
// 22. EXPORT POUR LES TESTS (Optionnel)
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initLoader,
        initCustomCursor,
        initNavbar,
        initMobileMenu,
        initTypingEffect,
        initHeroParticles,
        initCounters,
        initScrollReveal,
        initActiveNavLink,
        initTechMarquee,
        initFAQ,
        initContactForm,
        initNewsletterForm,
        initBackToTop,
        initSmoothScroll,
        initParallaxEffect
    };
}