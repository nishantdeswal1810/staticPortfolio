document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js for hero section
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'Python Developer',
                'Data Engineer',
                'ML Engineer',
                'Gen AI Engineer',
                'Data Analyst'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach((el) => {
        observer.observe(el);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('progress-bar').style.width = scrolled + '%';

        // Navbar background
        if (currentScroll > 100) {
            navbar.classList.add('backdrop-blur-sm', 'bg-white/80', 'shadow-lg');
        } else {
            navbar.classList.remove('backdrop-blur-sm', 'bg-white/80', 'shadow-lg');
        }

        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (currentScroll > 300) {
            backToTop.classList.remove('opacity-0', 'translate-y-10');
        } else {
            backToTop.classList.add('opacity-0', 'translate-y-10');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Back to top button click handler
    document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Project card interactions
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        delay: 100,
    });

    // Form handling (using Formspree)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Form is now handled by Formspree
            // You can add additional client-side validation here if needed
            const button = form.querySelector('button[type="submit"]');
            button.textContent = 'Sending...';
            button.disabled = true;

            // Re-enable button after 2 seconds (Formspree will handle the redirect)
            setTimeout(() => {
                button.textContent = 'Send Message';
                button.disabled = false;
            }, 2000);
        });
    }

    // Remove preloader after page load
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    });

    // Add unique animation delay for each skill tag
    document.querySelectorAll('.skill-tag').forEach((tag, index) => {
        tag.setAttribute('data-aos-delay', (index * 50).toString());
    });
});