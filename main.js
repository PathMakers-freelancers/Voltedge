document.addEventListener('DOMContentLoaded', () => {
    // === Theme Toggle ===
    const themeBtn = document.getElementById('theme-btn');
    const html = document.documentElement;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeBtn) {
            themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // === Loader ===
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 300); // Super fast load
    }

    // === Navbar Scroll Effect ===
    const navbar = document.querySelector('.navbar');
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    if (navbar) {
        window.addEventListener('scroll', handleScroll);
        // Initial check in case of reload
        handleScroll();
    }

    // === Scroll Animations ===
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Default animation
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Trigger 'Circuit Breaker' effect for specific cards
                if (entry.target.classList.contains('glass-card') ||
                    entry.target.classList.contains('feature-card') ||
                    entry.target.classList.contains('project-card') ||
                    entry.target.classList.contains('testimonial-card')) {
                    entry.target.classList.add('card-forming-circuit');
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-up').forEach(el => {
        observer.observe(el);
    });

    // === Mobile Menu Toggle ===
    // Simple implementation for mobile responsiveness
    // === Mobile Menu Logic ===
    const hamburger = document.createElement('button');
    hamburger.className = 'btn-icon mobile-toggle';
    hamburger.innerHTML = '☰';
    hamburger.style.display = 'none';

    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');

    if (navContainer && navLinks) {
        navContainer.appendChild(hamburger);

        hamburger.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';

            if (!isVisible) {
                // Styling when menu is open
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--bg-card)';
                navLinks.style.backdropFilter = 'blur(15px)';
                navLinks.style.padding = '1rem';
                navLinks.style.borderBottom = '1px solid var(--glass-border)';
                navLinks.style.zIndex = '1000';
            }
        });

        // Close menu when clicking a link (non-dropdown)
        navLinks.querySelectorAll('a:not(.dropdown-item)').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992 && !link.closest('.dropdown-menu')) {
                    navLinks.style.display = 'none';
                }
            });
        });

        // Handle Resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                hamburger.style.display = 'none';
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
                navLinks.style.position = 'static';
                navLinks.style.background = 'transparent';
                navLinks.style.padding = '0';
                navLinks.style.borderBottom = 'none';
            } else {
                hamburger.style.display = 'block';
                if (navLinks.style.flexDirection !== 'column') {
                    navLinks.style.display = 'none'; // reset to closed on switch to mobile
                }
            }
        });

        // Initial Check
        if (window.innerWidth <= 992) {
            hamburger.style.display = 'block';
            navLinks.style.display = 'none';
        }

        // === Dropdown for Mobile ===
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const dropdown = item.querySelector('.dropdown-menu');

            if (dropdown && link) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 992) {
                        e.preventDefault();
                        e.stopPropagation();

                        const isActive = item.classList.contains('active');

                        // Close other dropdowns
                        navItems.forEach(i => {
                            if (i !== item) i.classList.remove('active');
                        });

                        item.classList.toggle('active');
                    }
                });
            }
        });
    }
    // === Counter Animation ===
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                const prefix = counter.getAttribute('data-prefix') || '';
                const duration = 2000; // Animation duration in ms
                const increment = target / (duration / 16); // 60fps

                const isFloat = counter.getAttribute('data-target').includes('.');

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = prefix + (isFloat ? current.toFixed(2) : Math.ceil(current)) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = prefix + target + suffix;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    document.querySelectorAll('.counter-animate').forEach(counter => {
        counterObserver.observe(counter);
    });

    // === Dashboard Sidebar Toggle ===
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.dash-sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
                sidebar.classList.remove('active');
            }
        });

        // Close sidebar when clicking a link (mobile)
        sidebar.querySelectorAll('.dash-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('active');
                }
            });
        });
    }

    // === Highlight Active Nav Link ===
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('.nav-link, .dropdown-item');

    allNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');

            // If it's a dropdown item, also highlight the parent nav-link
            const parentDropdown = link.closest('.dropdown-menu');
            if (parentDropdown) {
                const parentNavLink = parentDropdown.parentElement.querySelector('.nav-link');
                if (parentNavLink) parentNavLink.classList.add('active');
            }
        }
    });
});
