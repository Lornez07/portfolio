document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initMobileNavigation();
    initScrollAnimations();
    initSkillBars();
    initCounterAnimation();
    initSmoothScroll();
    initNavbarScroll();
    initBackToTop();
    initContactForm();
    initTypingAnimation();
    initActiveNav();
    initScrollProgress();
    initParticles();
    initGitHubStats();
});

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        cursor.style.left = mouseX - 6 + 'px';
        cursor.style.top = mouseY - 6 + 'px';

        followerX += (mouseX - followerX - 15) * 0.1;
        followerY += (mouseY - followerY - 15) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animate);
    }
    animate();

    const interactive = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-category, .tech-tag');
    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            follower.style.transform = 'scale(1.5)';
            follower.style.borderColor = 'var(--accent-primary)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.borderColor = 'var(--accent-secondary)';
        });
    });

    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; follower.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; follower.style.opacity = '1'; });
}

function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

function initScrollAnimations() {
    const options = { root: null, rootMargin: '0px', threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
    }, options);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-section');
        observer.observe(section);
    });

    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, options);
        cardObserver.observe(card);
    });

    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'all 0.6s ease';
        category.style.transitionDelay = `${index * 0.15}s`;

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, options);
        skillObserver.observe(category);
    });
}

function initSkillBars() {
    const options = { root: null, rootMargin: '0px', threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.progress + '%';
            }
        });
    }, options);
    document.querySelectorAll('.skill-progress').forEach(bar => observer.observe(bar));
}

function initCounterAnimation() {
    const options = { root: null, rootMargin: '0px', threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    document.querySelectorAll('.stat-number').forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({ top: target.offsetTop - navHeight, behavior: 'smooth' });
            }
        });
    });
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.style.background = window.scrollY > 50 ? 'rgba(10, 10, 15, 0.95)' : 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none';
    });
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn.textContent;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name) return showFormError(form.name, 'Name is required');
        if (!email) return showFormError(form.email, 'Email is required');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return showFormError(form.email, 'Invalid email address');
        if (!message) return showFormError(form.message, 'Message is required');

        btn.innerHTML = '<span class="spinner"></span> Sending...';
        btn.classList.add('btn-loading');
        btn.disabled = true;

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to send');

            form.innerHTML = `<div class="form-success">
                <span class="success-icon">✓</span>
                <p>Message sent successfully! I'll get back to you soon.</p>
            </div>`;
        } catch (err) {
            btn.innerHTML = btnText;
            btn.classList.remove('btn-loading');
            btn.disabled = false;
            showFormError(null, err.message);
        }
    });
}

function showFormError(input, msg) {
    const existing = document.querySelector('.form-error');
    if (existing) existing.remove();

    const err = document.createElement('p');
    err.className = 'form-error';
    err.textContent = msg;

    if (input) {
        input.focus();
        input.parentNode.appendChild(err);
    } else {
        document.querySelector('.contact-form').prepend(err);
    }
}

// ============================================
// Typing Animation
// ============================================
function initTypingAnimation() {
    const titles = [
        'Full-Stack Developer',
        'Flutter Dev',
        'Problem Solver',
        'React / Next.js Dev',
    ];

    const el = document.getElementById('typedTitle');
    if (!el) return;

    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 100;

    function type() {
        const current = titles[index];
        if (!isDeleting) {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                speed = 1500;
                setTimeout(type, speed);
                return;
            }
            speed = 80 + Math.random() * 60;
        } else {
            el.textContent = current.substring(0, charIndex);
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                index = (index + 1) % titles.length;
                speed = 500;
                setTimeout(type, speed);
                return;
            }
            speed = 40 + Math.random() * 40;
        }
        setTimeout(type, speed);
    }
    type();
}

// ============================================
// Active Nav Link
// ============================================
function initActiveNav() {
    const links = document.querySelectorAll('.nav-links a');
    if (!links.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(link => link.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
}

// ============================================
// Scroll Progress Bar
// ============================================
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (scrollTop / docHeight) * 100 + '%';
    });
}

// ============================================
// Particle Background
// ============================================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resize() {
        const hero = canvas.parentElement;
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = Array.from({ length: 50 }, () => new Particle());
        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 255, 136, ${0.1 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        animFrame = requestAnimationFrame(draw);
    }

    init();
    window.addEventListener('resize', resize);
}

// ============================================
// GitHub Stats
// ============================================
function initGitHubStats() {
    const el = document.getElementById('githubRepoCount');
    if (!el) return;

    const FALLBACK = '13+';
    const cached = localStorage.getItem('ghRepoCount');
    el.textContent = cached || FALLBACK;

    fetch('https://api.github.com/users/Lornez07/repos?per_page=100')
        .then(res => res.json())
        .then(repos => {
            if (Array.isArray(repos)) {
                const count = repos.filter(r => !r.fork).length;
                if (count > 0) {
                    const text = count + '+';
                    el.textContent = text;
                    localStorage.setItem('ghRepoCount', text);
                }
            }
        })
        .catch(() => {});
}

// ============================================
// Project Modal
// ============================================
const projects = {
    'convergent-scanner': {
        title: 'Convergent Scanner',
        description: 'Cross-platform License Plate Recognition (LPR) mobile and web application built during my IT internship. Features on-device ML Kit Auto-Scan at 30fps, cloud-assisted validation using Roboflow API and Plate Recognizer LPR API backend, and fuzzy matching algorithms to handle character ambiguities.',
        tech: ['Flutter', 'Dart', 'ML Kit', 'Roboflow', 'LPR API'],
        links: [{ text: 'Internship Project', url: null }],
    },
    'epark-mo': {
        title: 'E-Park Mo',
        description: 'Smart parking system with real-time slot monitoring, reservation system, boom barrier control, and ESP32 hardware integration. Capstone thesis project recognized as Best Software Project at St. Louis College Valenzuela.',
        tech: ['Flutter', 'Firebase', 'IoT', 'Arduino'],
        links: [{ text: 'View Code →', url: 'https://github.com/Lornez07/eparkmo' }],
    },
    'marqai': {
        title: 'MarqAI',
        description: 'AI companion chat app with voice mode, holographic UI, and Google Gemini integration. Features voice input/output, real-time chat, and a futuristic holographic interface built with Framer Motion.',
        tech: ['React', 'TypeScript', 'Gemini AI', 'Framer Motion'],
        links: [{ text: 'View Code →', url: 'https://github.com/Lornez07/marqai' }],
    },
    'flappy-avatar': {
        title: 'Flappy Avatar',
        description: 'Flappy Bird-style game with custom avatar upload, circular cropping, and Supabase leaderboard. Features high-DPI canvas rendering with rotational physics and score tracking.',
        tech: ['React', 'TypeScript', 'Canvas', 'Supabase'],
        links: [{ text: 'View Code →', url: 'https://github.com/Lornez07/flappy-avatar' }],
    },
    'dvya-basketball': {
        title: 'DVYA Basketball',
        description: 'Full-stack basketball league management app with Supabase authentication, PWA support, team and player management, real-time standings, and match scheduling.',
        tech: ['Next.js', 'Supabase', 'TypeScript', 'PWA'],
        links: [{ text: 'View Code →', url: 'https://github.com/Lornez07/dvya-basketball' }],
    },
    'mock-interview': {
        title: 'AI Mock Interview Coach',
        description: 'AI-powered interview practice app with role-specific questions, instant scoring from 1-10, and detailed feedback via Google Gemini AI. Supports multiple roles and experience levels.',
        tech: ['React', 'Node.js', 'MongoDB', 'Gemini AI'],
        links: [{ text: 'View Code →', url: 'https://github.com/Lornez07/mock-interview-coach' }],
    },
    'rgj-trucking': {
        title: 'RGJ Trucking Services',
        description: 'Booking website for trucking services with Vercel serverless backend and email notifications via Nodemailer. Features service booking, inquiry forms, and contact functionality.',
        tech: ['HTML/CSS', 'JavaScript', 'Node.js', 'Vercel'],
        links: [{ text: 'View Code →', url: 'https://github.com/Lornez07/rgj-trucking' }],
    },
};

function openProjectModal(id) {
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('projectModalBody');
    const project = projects[id];
    if (!modal || !body || !project) return;

    body.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <div class="project-tech">
            ${project.tech.map(t => `<span>${t}</span>`).join('')}
        </div>
        <div class="project-links">
            ${project.links.map(l => l.url
                ? `<a href="${l.url}" class="project-link" target="_blank">${l.text}</a>`
                : `<span class="project-link project-link-internal">${l.text}</span>`
            ).join('')}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal(e) {
    if (e && e.target !== e.currentTarget) return;
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
        closeProjectModal(e);
    }
});

// ============================================
// Lightbox
// ============================================
function openLightbox() {
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// Dynamic CSS
// ============================================
const style = document.createElement('style');
style.textContent = `
    .fade-section { opacity: 0; transform: translateY(30px); transition: all 0.8s ease; }
    .fade-section.animate-in { opacity: 1; transform: translateY(0); }
    .typing-effect::after { content: '|'; animation: blink 1s step-end infinite; }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
`;
document.head.appendChild(style);