// قيشا دبي - Premium Coffee Landing Page
// Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // Navbar scroll effect
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

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate taste bars when visible
                if (entry.target.classList.contains('tasting-section')) {
                    animateTasteBars();
                }
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Animate taste bars
    function animateTasteBars() {
        document.querySelectorAll('.taste-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Add to cart button interaction
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'تمت الإضافة ✓';
            this.style.background = 'var(--color-gold)';
            this.style.color = 'var(--color-black)';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
                this.style.color = '';
            }, 2000);
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Product cards hover effect
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.product-image .image-placeholder').style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.product-image .image-placeholder').style.transform = 'scale(1)';
        });
    });

    // Experience cards stagger animation
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Tasting wheel rotation on scroll
    const tastingWheel = document.querySelector('.tasting-wheel');
    if (tastingWheel) {
        window.addEventListener('scroll', () => {
            const rect = tastingWheel.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                tastingWheel.style.transform = `rotate(${scrollProgress * 30}deg)`;
            }
        });
    }

    // Stats counter animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        updateCounter();
    }

    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const number = entry.target.querySelector('.stat-number');
                if (number) {
                    const value = parseInt(number.textContent.replace(/[^0-9]/g, ''));
                    if (!isNaN(value) && value < 1000) {
                        animateCounter(number, value);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Mobile menu toggle (for future implementation)
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    mobileMenuBtn.style.cssText = `
        display: none;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 10px;
    `;

    // Add mobile menu button styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: flex !important;
            }
            .mobile-menu-btn span {
                width: 25px;
                height: 2px;
                background: var(--color-white);
                transition: all 0.3s ease;
            }
        }

        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        section.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .hero {
            opacity: 1;
            transform: none;
        }

        .product-image .image-placeholder {
            transition: transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);

    // Initialize - make hero visible immediately
    document.querySelector('.hero').classList.add('visible');

});
