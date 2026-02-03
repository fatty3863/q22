// قيشا دبي - Premium Coffee Landing Page
// Advanced Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // Loading Screen
    // ===================================
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = '<div class="loading-logo">قيشا<span style="color: #c9a962;">دبي</span></div>';
    document.body.prepend(loadingScreen);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'visible';
            initAnimations();
        }, 1500);
    });

    // ===================================
    // Custom Cursor
    // ===================================
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let cursorVisible = false;
    let cursorX = 0, cursorY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;

        if (!cursorVisible) {
            cursor.style.opacity = '1';
            cursorVisible = true;
        }
    });

    // Smooth cursor following
    function animateCursor() {
        const dx = cursorX - currentX;
        const dy = cursorY - currentY;

        currentX += dx * 0.15;
        currentY += dy * 0.15;

        cursor.style.left = currentX + 'px';
        cursor.style.top = currentY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effect
    document.querySelectorAll('a, button, .btn, .product-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Hide cursor on mobile
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
    }

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // Smooth Scroll
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Reveal Animations on Scroll
    // ===================================
    function initAnimations() {
        // Add reveal classes to elements
        document.querySelectorAll('.section-tag, .section-title').forEach(el => {
            el.classList.add('reveal');
        });

        document.querySelectorAll('.story-image').forEach(el => {
            el.classList.add('reveal-left');
        });

        document.querySelectorAll('.story-content').forEach(el => {
            el.classList.add('reveal-right');
        });

        document.querySelectorAll('.experience-card').forEach((el, i) => {
            el.classList.add('reveal', `stagger-${(i % 4) + 1}`);
        });

        document.querySelectorAll('.product-card').forEach((el, i) => {
            el.classList.add('reveal', `stagger-${(i % 3) + 1}`);
        });

        document.querySelectorAll('.testimonial-card').forEach((el, i) => {
            el.classList.add('reveal-scale', `stagger-${(i % 3) + 1}`);
        });

        // Initialize observer
        observeElements();
    }

    function observeElements() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // Animate counters when visible
                    if (entry.target.classList.contains('stat-number')) {
                        animateCounter(entry.target);
                    }

                    // Animate taste bars
                    if (entry.target.closest('.tasting-section')) {
                        animateTasteBars();
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            observer.observe(el);
        });

        document.querySelectorAll('.stat-number').forEach(el => {
            observer.observe(el);
        });

        document.querySelectorAll('.tasting-section').forEach(el => {
            observer.observe(el);
        });
    }

    // ===================================
    // Counter Animation
    // ===================================
    function animateCounter(element) {
        if (element.dataset.animated) return;
        element.dataset.animated = 'true';

        const text = element.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));

        if (isNaN(number) || number > 10000) return;

        const prefix = text.match(/^[^0-9]*/)?.[0] || '';
        const suffix = text.match(/[^0-9]*$/)?.[0] || '';

        let current = 0;
        const duration = 2000;
        const increment = number / (duration / 16);
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            current = Math.floor(number * easeOutQuart);

            element.textContent = prefix + current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = text;
            }
        }

        requestAnimationFrame(update);
    }

    // ===================================
    // Taste Bars Animation
    // ===================================
    let tasteBarsAnimated = false;
    function animateTasteBars() {
        if (tasteBarsAnimated) return;
        tasteBarsAnimated = true;

        document.querySelectorAll('.taste-fill').forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0%';
            bar.style.transition = 'none';

            setTimeout(() => {
                bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = width;
            }, index * 200 + 300);
        });
    }

    // ===================================
    // Parallax Effect
    // ===================================
    const parallaxElements = document.querySelectorAll('.hero, .cta-section');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.3;
                const yPos = (rect.top * speed);
                el.style.backgroundPositionY = yPos + 'px';
            }
        });
    });

    // ===================================
    // Floating Particles
    // ===================================
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';

        for (let i = 0; i < 9; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particlesContainer.appendChild(particle);
        }

        hero.appendChild(particlesContainer);
    }
    createParticles();

    // ===================================
    // Product Card 3D Effect
    // ===================================
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================================
    // Magnetic Button Effect
    // ===================================
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.classList.add('btn-magnetic');

        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // ===================================
    // Add to Cart Animation
    // ===================================
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            // Ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(201, 169, 98, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);

            // Button state change
            const originalText = this.textContent;
            this.textContent = 'تمت الإضافة ✓';
            this.style.background = 'var(--color-gold)';
            this.style.color = 'var(--color-black)';
            this.style.pointerEvents = 'none';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
                this.style.color = '';
                this.style.pointerEvents = '';
            }, 2000);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ===================================
    // Text Split Animation for Hero Title
    // ===================================
    function splitText(element) {
        const text = element.textContent;
        element.innerHTML = '';

        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.style.animationDelay = `${i * 0.05 + 0.5}s`;
            span.textContent = char === ' ' ? '\u00A0' : char;
            element.appendChild(span);
        });
    }

    // ===================================
    // Image Placeholder Hover Effect
    // ===================================
    document.querySelectorAll('.image-placeholder').forEach(placeholder => {
        placeholder.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

        const parent = placeholder.closest('.product-card, .story-image');
        if (parent) {
            parent.addEventListener('mouseenter', () => {
                placeholder.style.transform = 'scale(1.05)';
            });
            parent.addEventListener('mouseleave', () => {
                placeholder.style.transform = 'scale(1)';
            });
        }
    });

    // ===================================
    // Tasting Wheel Interaction
    // ===================================
    const tastingWheel = document.querySelector('.tasting-wheel');
    if (tastingWheel) {
        let rotation = 0;

        tastingWheel.addEventListener('mouseenter', () => {
            tastingWheel.style.animationPlayState = 'paused';
        });

        tastingWheel.addEventListener('mouseleave', () => {
            tastingWheel.style.animationPlayState = 'running';
        });

        // Manual rotation on drag
        let isDragging = false;
        let startAngle = 0;

        tastingWheel.addEventListener('mousedown', (e) => {
            isDragging = true;
            const rect = tastingWheel.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const rect = tastingWheel.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            const delta = currentAngle - startAngle;

            rotation += delta * (180 / Math.PI);
            tastingWheel.style.transform = `rotate(${rotation}deg)`;
            startAngle = currentAngle;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    // ===================================
    // Scroll Progress Indicator
    // ===================================
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #c9a962, #d4b978);
        z-index: 9999;
        transition: width 0.1s linear;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // ===================================
    // Floating Badge Animation
    // ===================================
    const floatingBadge = document.querySelector('.floating-badge');
    if (floatingBadge) {
        floatingBadge.classList.add('floating', 'pulse-glow');
    }

    // ===================================
    // Hero Title Shine Effect
    // ===================================
    const heroGoldText = document.querySelector('.hero-title .gold-text');
    if (heroGoldText) {
        heroGoldText.classList.add('text-shine');
    }

    // ===================================
    // Smooth Section Transitions
    // ===================================
    document.querySelectorAll('section').forEach(section => {
        section.style.transition = 'opacity 0.5s ease';
    });

    // ===================================
    // Keyboard Navigation
    // ===================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const sections = document.querySelectorAll('section');
            const currentScroll = window.pageYOffset;

            for (let section of sections) {
                if (section.offsetTop > currentScroll + 50) {
                    window.scrollTo({
                        top: section.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    break;
                }
            }
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const sections = Array.from(document.querySelectorAll('section')).reverse();
            const currentScroll = window.pageYOffset;

            for (let section of sections) {
                if (section.offsetTop < currentScroll - 50) {
                    window.scrollTo({
                        top: section.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    break;
                }
            }
        }
    });

    console.log('قيشا دبي - Premium Coffee Experience Loaded');
});
