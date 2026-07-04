// ============================================================
// KIVUCODE SOLUTIONS - JAVASCRIPT PREMIUM
// Version optimisée
// ============================================================

'use strict';

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
    
    console.log('🚀 KivuCode Solutions - Site Premium');
    console.log('📧 fayasgracias792@gmail.com | 📱 +243 832 287 305');
});

// ============================================================
// 1. LOADER
// ============================================================
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        }, 800);
    });
    
    setTimeout(() => {
        if (!loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
        }
    }, 3000);
}

// ============================================================
// 2. CUSTOM CURSOR
// ============================================================
function initCustomCursor() {
    if (window.innerWidth < 1024) return;
    
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = (mouseX - 4) + 'px';
        cursor.style.top = (mouseY - 4) + 'px';
    });
    
    function animate() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        follower.style.left = (cursorX - 20) + 'px';
        follower.style.top = (cursorY - 20) + 'px';
        requestAnimationFrame(animate);
    }
    animate();
    
    const hoverTargets = 'a, button, .btn, input, textarea, .service-card, .portfolio-card, .faq-question, .hamburger';
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('hover');
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('hover');
            cursor.style.transform = 'scale(1)';
        });
    });
}

// ============================================================
// 3. NAVBAR SCROLL
// ============================================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    const toggle = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
}

// ============================================================
// 4. MENU MOBILE
// ============================================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;
    
    const toggleMenu = () => {
        const isOpen = hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };
    
    hamburger.addEventListener('click', toggleMenu);
    
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) toggleMenu();
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('open')) {
            toggleMenu();
        }
    });
}

// ============================================================
// 5. TYPING EFFECT
// ============================================================
function initTypingEffect() {
    const el = document.getElementById('typingText');
    if (!el) return;
    
    const words = ['React.js', 'Node.js', 'Flutter', 'Laravel', 'Next.js', 'Vue.js', 'TypeScript', 'Docker', 'AWS', 'Firebase'];
    let wordIdx = 0, charIdx = 0, isDeleting = false;
    
    function type() {
        const word = words[wordIdx];
        if (isDeleting) {
            el.textContent = word.substring(0, --charIdx);
        } else {
            el.textContent = word.substring(0, ++charIdx);
        }
        
        let speed = isDeleting ? 40 : 100;
        if (!isDeleting && charIdx === word.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            speed = 400;
        }
        setTimeout(type, speed);
    }
    setTimeout(type, 500);
}

// ============================================================
// 6. HERO PARTICLES
// ============================================================
function initHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s ${Math.random() * 5}s ease-in-out infinite;
            pointer-events: none;
        `;
        container.appendChild(p);
    }
}

// ============================================================
// 7. COUNTERS
// ============================================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number, .hero-stat-number');
    const animated = new Set();
    
    counters.forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated.has(counter)) {
                    animated.add(counter);
                    const target = parseInt(counter.dataset.target, 10);
                    if (!target) return;
                    
                    let current = 0;
                    const startTime = performance.now();
                    const duration = 2000;
                    
                    function update(ts) {
                        const progress = Math.min((ts - startTime) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        current = Math.floor(eased * target);
                        counter.textContent = current;
                        if (progress < 1) requestAnimationFrame(update);
                        else counter.textContent = target;
                    }
                    requestAnimationFrame(update);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(counter);
    });
}

// ============================================================
// 8. SCROLL REVEAL
// ============================================================
function initScrollReveal() {
    const targets = '.service-card, .portfolio-card, .testimonial-card, .why-us-feature, .tech-item';
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay, 10) || 0;
                setTimeout(() => entry.target.classList.add('revealed'), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll(targets).forEach(el => observer.observe(el));
}

// ============================================================
// 9. ACTIVE NAV LINK
// ============================================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    
    const update = () => {
        let current = '';
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) current = section.id;
        });
        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
        if (window.scrollY < 300) {
            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#home');
            });
        }
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
}

// ============================================================
// 10. TECH MARQUEE
// ============================================================
function initTechMarquee() {
    const track = document.getElementById('techTrack');
    if (!track) return;
    
    const techs = [
        { name: 'React', icon: 'fa-brands fa-react' },
        { name: 'Node.js', icon: 'fa-brands fa-node-js' },
        { name: 'Flutter', icon: 'fa-solid fa-mobile-alt' },
        { name: 'Docker', icon: 'fa-brands fa-docker' },
        { name: 'AWS', icon: 'fa-solid fa-cloud' },
        { name: 'MongoDB', icon: 'fa-solid fa-database' },
        { name: 'Laravel', icon: 'fa-brands fa-laravel' },
        { name: 'PostgreSQL', icon: 'fa-solid fa-database' },
        { name: 'Firebase', icon: 'fa-solid fa-fire' },
        { name: 'TypeScript', icon: 'fa-brands fa-js' },
        { name: 'Next.js', icon: 'fa-brands fa-react' },
        { name: 'Vue.js', icon: 'fa-brands fa-vuejs' }
    ];
    
    const items = techs.map(t => {
        const div = document.createElement('div');
        div.className = 'tech-track-item';
        div.innerHTML = `<i class="${t.icon}"></i><span>${t.name}</span>`;
        return div;
    });
    [...items, ...items].forEach(el => track.appendChild(el));
    
    track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}

// ============================================================
// 11. FAQ (using details/summary)
// ============================================================
function initFAQ() {
    // Les éléments <details> sont déjà fonctionnels nativement
    // On ajoute juste un peu de style via JS pour la compatibilité
    document.querySelectorAll('.faq-item').forEach(item => {
        const summary = item.querySelector('.faq-question');
        if (summary) {
            summary.addEventListener('click', () => {
                // Safari bug fix: ensure toggle works
                setTimeout(() => {
                    const isOpen = item.hasAttribute('open');
                    summary.setAttribute('aria-expanded', isOpen);
                }, 50);
            });
        }
    });
}

// ============================================================
// 12. CONTACT FORM
// ============================================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const feedback = document.getElementById('formFeedback');
    const counter = document.querySelector('.form-counter');
    
    function validate(input) {
        if (!input.value.trim()) {
            input.className = 'error';
            return false;
        }
        if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            input.className = 'error';
            return false;
        }
        input.className = 'valid';
        return true;
    }
    
    [name, email, message].forEach(input => {
        if (input) {
            input.addEventListener('blur', () => validate(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) validate(input);
            });
        }
    });
    
    if (message && counter) {
        message.addEventListener('input', () => {
            const len = message.value.length;
            counter.textContent = `${len}/500`;
            counter.style.color = len > 450 ? (len > 490 ? '#ef4444' : '#f59e0b') : '';
        });
    }
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const valid = validate(name) && validate(email) && validate(message);
        if (!valid) {
            feedback.textContent = 'Veuillez corriger les erreurs ci-dessus.';
            feedback.className = 'form-feedback error';
            feedback.style.display = 'block';
            return;
        }
        
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        feedback.style.display = 'none';
        
        try {
            const data = new FormData(form);
            const res = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                feedback.textContent = '✅ Message envoyé avec succès ! Nous vous répondrons dans les 24h.';
                feedback.className = 'form-feedback success';
                feedback.style.display = 'block';
                form.reset();
                [name, email, message].forEach(i => { if (i) i.className = ''; });
                if (counter) counter.textContent = '0/500';
            } else {
                throw new Error('Erreur serveur');
            }
        } catch (err) {
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
// 13. NEWSLETTER
// ============================================================
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const btn = form.querySelector('button');
        if (!input.value.trim()) {
            form.style.animation = 'shake 0.5s ease';
            setTimeout(() => form.style.animation = '', 500);
            return;
        }
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.style.background = '#10b981';
        input.value = '';
        setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; }, 2000);
    });
}

// ============================================================
// 14. BACK TO TOP
// ============================================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// 15. SMOOTH SCROLL
// ============================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offset = document.getElementById('navbar').offsetHeight + 20;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        });
    });
}

// ============================================================
// 16. PARALLAX
// ============================================================
function initParallaxEffect() {
    const els = document.querySelectorAll('.hero-dashboard-placeholder, .why-us-image-placeholder, .about-image-placeholder');
    const update = () => {
        els.forEach(el => {
            const rect = el.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const offset = (centerY - window.innerHeight / 2) * 0.05;
            el.style.transform = `translateY(${Math.max(-20, Math.min(20, offset))}px)`;
        });
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
}

// ============================================================
// 17. REDUCED MOTION
// ============================================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// ============================================================
// 18. SHAKE ANIMATION (for newsletter)
// ============================================================
if (!document.getElementById('shakeStyle')) {
    const style = document.createElement('style');
    style.id = 'shakeStyle';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-3px); }
        }
    `;
    document.head.appendChild(style);
}