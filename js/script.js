// BHAgency JavaScript - Interactive Components and SEO Enhancements

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initFormHandling();
    initAnimations();
    initSEOFeatures();
});

// Navigation System
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile Navigation Toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar scroll effect
        if (navbar) {
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        lastScrollTop = scrollTop;
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Validate form
            if (!validateForm(formObject)) {
                return;
            }

            // Simulate form submission (replace with actual implementation)
            submitForm(formObject);
        });
    }
}

function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim() === '') {
        errors.push('Name is required');
    }
    
    if (!data.email || data.email.trim() === '') {
        errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.message || data.message.trim() === '') {
        errors.push('Message is required');
    }

    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.form-error');
    existingErrors.forEach(error => error.remove());

    // Add new error messages
    const form = document.getElementById('contactForm');
    errors.forEach(error => {
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = error;
        errorElement.style.color = 'var(--accent-coral)';
        errorElement.style.marginBottom = '0.5rem';
        form.insertBefore(errorElement, form.firstChild);
    });
}

function submitForm(data) {
    // Simulate form submission
    console.log('Form submitted:', data);
    
    // Show success message
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    
    if (form && success) {
        form.style.display = 'none';
        success.style.display = 'block';
        
        // Reset form after 5 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            success.style.display = 'none';
        }, 5000);
    }
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .case-study-card, .team-member');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// SEO Features
function initSEOFeatures() {
    // Add structured data for breadcrumbs
    addBreadcrumbSchema();
    
    // Track page performance
    trackPagePerformance();
    
    // Initialize local SEO features
    initLocalSEO();
}

function addBreadcrumbSchema() {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (!breadcrumbs) return;

    const breadcrumbList = [];
    const breadcrumbItems = breadcrumbs.querySelectorAll('.breadcrumb-item');
    
    breadcrumbItems.forEach((item, index) => {
        const text = item.textContent.trim();
        const url = item.querySelector('a') ? item.querySelector('a').href : window.location.href;
        
        breadcrumbList.push({
            '@type': 'ListItem',
            'position': index + 1,
            'name': text,
            'item': url
        });
    });

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbList
    };

    addStructuredData(schema);
}

function addStructuredData(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}

function trackPagePerformance() {
    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    console.log('CLS:', clsValue);
                }
            });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
}

function initLocalSEO() {
    // Add local business schema if on contact page
    if (window.location.hash === '#contact' || window.location.pathname.includes('contact')) {
        const localBusinessSchema = {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'BHAgency',
            'url': 'https://bhagency.com',
            'logo': 'https://bhagency.com/logo.png',
            'description': 'Premier IT consulting and iGaming marketing strategy agency',
            'address': {
                '@type': 'PostalAddress',
                'addressCountry': 'MT',
                'addressLocality': 'Malta'
            },
            'contactPoint': {
                '@type': 'ContactPoint',
                'telephone': '+356277123456',
                'contactType': 'consultation',
                'availableLanguage': ['English', 'Italian', 'Romanian']
            },
            'areaServed': [
                {
                    '@type': 'Country',
                    'name': 'Malta'
                },
                {
                    '@type': 'Country',
                    'name': 'Romania'
                },
                {
                    '@type': 'Country',
                    'name': 'Italy'
                }
            ],
            'serviceType': [
                'IT Consulting Services',
                'iGaming Consulting Services',
                'Marketing Strategy Services',
                'Technology Advisory Services'
            ]
        };

        addStructuredData(localBusinessSchema);
    }
}

// Utility Functions
function debounce(func, wait) {
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Analytics Integration (placeholder)
function initAnalytics() {
    // Add Google Analytics or other analytics here
    console.log('Analytics initialized');
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Performance Monitoring
window.addEventListener('load', function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
    
    // You could send this data to analytics
});

// Add CSS animation classes dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        color: var(--accent-yellow) !important;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .form-error {
        background: rgba(238, 99, 82, 0.1);
        border: 1px solid var(--accent-coral);
        border-radius: var(--border-radius);
        padding: 0.75rem;
        margin-bottom: 1rem;
    }
`;
document.head.appendChild(style);

// Initialize analytics when page is fully loaded
window.addEventListener('load', initAnalytics);
