// SystemHustle.com - Unified JavaScript
// Consolidates all site functionality into one file

document.addEventListener('DOMContentLoaded', function() {
    console.log('SystemHustle.com loaded - v2.0');
    
    // Initialize all components
    initializeBranding();
    initializeThemeToggle();
    initializeMobileMenu();
    initializeScrollFeatures();
    initializeAnimations();
    initializeContactButtons();
    initializePageSpecificFeatures();
});

// =============================================================================
// BRANDING SYSTEM - Centralized Brand Management
// =============================================================================
function initializeBranding() {
    if (typeof SITE_CONFIG === 'undefined') return;
    
    // Update favicon
    updateFavicon();
    
    // Update logo text and icons
    updateLogos();
    
    console.log('Branding initialized');
}

function updateFavicon() {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon && SITE_CONFIG.branding?.favicon) {
        favicon.href = SITE_CONFIG.branding.favicon;
    }
}

function updateLogos() {
    // Update main logo text
    document.querySelectorAll('[data-brand="logo"]').forEach(el => {
        if (SITE_CONFIG.branding?.logo?.text) {
            el.textContent = SITE_CONFIG.branding.logo.text;
        }
    });
    
    // Update logo icons/symbols
    document.querySelectorAll('[data-brand="symbol"]').forEach(el => {
        if (SITE_CONFIG.branding?.logo?.symbol) {
            el.innerHTML = SITE_CONFIG.branding.logo.symbol;
        }
    });
    
    // Update compact logo (just letter)
    document.querySelectorAll('[data-brand="icon"]').forEach(el => {
        if (SITE_CONFIG.branding?.logo?.icon) {
            el.textContent = SITE_CONFIG.branding.logo.icon;
        }
    });
}

// =============================================================================
// THEME TOGGLE SYSTEM
// =============================================================================
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileHeaderThemeToggle = document.getElementById('mobileHeaderThemeToggle');
    const html = document.documentElement;
    
    if (!themeToggle && !mobileHeaderThemeToggle) return; // No theme toggle on this page
    
    // Get saved theme or default
    const currentTheme = localStorage.getItem(SITE_CONFIG.theme.storageKey) || SITE_CONFIG.theme.defaultMode;
    html.classList.toggle('dark', currentTheme === 'dark');
    updateThemeIcons(currentTheme);
    
    function toggleTheme() {
        const isDark = html.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        
        html.classList.toggle('dark');
        localStorage.setItem(SITE_CONFIG.theme.storageKey, newTheme);
        updateThemeIcons(newTheme);
    }
    
    // Bind event listeners
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (mobileHeaderThemeToggle) mobileHeaderThemeToggle.addEventListener('click', toggleTheme);
    
    function updateThemeIcons(theme) {
        const lightIcon = '<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>';
        const darkIcon = '<path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>';
        
        const iconHTML = theme === 'dark' ? darkIcon : lightIcon;
        
        document.querySelectorAll('#themeIcon, #mobileHeaderThemeIcon').forEach(icon => {
            if (icon) icon.innerHTML = iconHTML;
        });
    }
}

// =============================================================================
// MOBILE MENU SYSTEM
// =============================================================================
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (!mobileMenuBtn || !mobileMenu) return; // No mobile menu on this page
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        if (hamburger) hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-menu .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            if (hamburger) hamburger.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
}

// =============================================================================
// SCROLL FEATURES (Progress, Back to Top, Active Navigation)
// =============================================================================
function initializeScrollFeatures() {
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        // Scroll progress bar
        if (scrollProgress) {
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
        }
        
        // Back to top button
        if (backToTop) {
            if (scrollTop > 300) {
                backToTop.classList.remove('opacity-0', 'invisible');
                backToTop.classList.add('opacity-100', 'visible');
            } else {
                backToTop.classList.add('opacity-0', 'invisible');
                backToTop.classList.remove('opacity-100', 'visible');
            }
        }
        
        // Active navigation highlighting
        updateActiveNavigation(scrollTop);
    });
    
    // Back to top button click
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement && targetId !== '#') {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

function updateActiveNavigation(scrollTop) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// =============================================================================
// ANIMATIONS SYSTEM
// =============================================================================
function initializeAnimations() {
    // Only initialize if animations are enabled
    if (!SITE_CONFIG.features.scrollAnimations) return;
    
    initializeScrollReveal();
    initializeCounters();
}

function initializeScrollReveal() {
    // Scroll reveal observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '-50px 0px'
    });
    
    // Observe existing scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(element => {
        revealObserver.observe(element);
    });
    
    // Auto-add scroll reveal to common elements
    const autoRevealSelectors = [
        '#services .grid > div',
        '#process .grid > div',
        '#about .grid',
        '.group.text-center.p-10',
        '.animate-slide-up',
        '.animate-fade-in'
    ];
    
    autoRevealSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            if (!element.classList.contains('scroll-reveal')) {
                element.classList.add('scroll-reveal');
                revealObserver.observe(element);
            }
        });
    });
}

function initializeCounters() {
    // Counter animation
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    // Counter observer
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                if (target) {
                    animateCounter(counter, target);
                    counterObserver.unobserve(counter);
                }
            }
        });
    }, { threshold: 0.7 });
    
    // Observe all counters
    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });
}

// =============================================================================
// CONTACT BUTTONS SYSTEM
// =============================================================================
function initializeContactButtons() {
    // Update all contact buttons with config URLs
    updateContactButtons();
}

function updateContactButtons() {
    // Update Calendly buttons
    document.querySelectorAll('[data-cta="calendly"], .calendly-btn, [href*="calendly"]').forEach(button => {
        button.href = SITE_CONFIG.calendly;
    });
    
    // Update WhatsApp buttons
    document.querySelectorAll('[data-cta="whatsapp"], .whatsapp-btn, [href*="wa.me"]').forEach(button => {
        button.href = SITE_CONFIG.whatsappUrl;
    });
    
    // Update Email buttons
    document.querySelectorAll('[data-cta="email"], .email-btn, [href*="mailto"]').forEach(button => {
        button.href = SITE_CONFIG.emailUrl;
    });
}

// =============================================================================
// PAGE-SPECIFIC FEATURES
// =============================================================================
function initializePageSpecificFeatures() {
    // ROI Calculator (if present)
    if (document.getElementById('teamSize')) {
        initializeROICalculator();
    }
    
    // Blog features (if on blog page)
    if (document.body.classList.contains('blog-page')) {
        initializeBlogFeatures();
    }
    
    // FAQ Accordion (if present)
    if (document.querySelector('.faq-item')) {
        initializeFAQAccordion();
    }
    
    // Reality Check toggles (if present)
    if (document.querySelector('[data-reality]')) {
        initializeRealityToggles();
    }
}

// ROI Calculator
function initializeROICalculator() {
    console.log('Initializing ROI Calculator...');
    
    class ROICalculator {
        constructor() {
            this.elements = {
                teamSize: document.getElementById('teamSize'),
                teamSizeValue: document.getElementById('teamSizeValue'),
                hoursSaved: document.getElementById('hoursSaved'),
                hoursSavedValue: document.getElementById('hoursSavedValue'),
                monthlySavings: document.getElementById('monthlySavings'),
                yearlySavings: document.getElementById('yearlySavings'),
                roiMultiple: document.getElementById('roiMultiple')
            };
            
            this.init();
        }
        
        init() {
            if (this.elements.teamSize) {
                this.elements.teamSize.addEventListener('input', () => this.calculate());
            }
            if (this.elements.hoursSaved) {
                this.elements.hoursSaved.addEventListener('input', () => this.calculate());
            }
            
            // Initial calculation
            this.calculate();
        }
        
        calculate() {
            const teamSize = parseInt(this.elements.teamSize?.value || 5);
            const hoursSaved = parseInt(this.elements.hoursSaved?.value || 10);
            
            // Update display values
            if (this.elements.teamSizeValue) this.elements.teamSizeValue.textContent = teamSize;
            if (this.elements.hoursSavedValue) this.elements.hoursSavedValue.textContent = hoursSaved;
            
            // Calculate savings (assuming $30/hour average)
            const hourlyRate = 30;
            const workingDaysPerMonth = 22;
            
            const monthlySavings = teamSize * hoursSaved * workingDaysPerMonth * hourlyRate;
            const yearlySavings = monthlySavings * 12;
            
            // Calculate ROI multiple (assuming $5000 initial investment)
            const initialInvestment = 5000;
            const roiMultiple = yearlySavings / initialInvestment;
            
            // Update displays with animation
            this.animateValue(this.elements.monthlySavings, monthlySavings, '$', true);
            this.animateValue(this.elements.yearlySavings, yearlySavings, '$', true);
            this.animateValue(this.elements.roiMultiple, roiMultiple, '', false, 1);
        }
        
        animateValue(element, target, prefix = '', addCommas = false, decimals = 0) {
            if (!element) return;
            
            const start = 0;
            const duration = 1000;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                let displayValue = current.toFixed(decimals);
                if (addCommas) {
                    displayValue = Math.floor(current).toLocaleString();
                }
                
                element.textContent = prefix + displayValue + (decimals > 0 ? 'x' : '');
            }, 16);
        }
    }
    
    new ROICalculator();
}

// FAQ Accordion
function initializeFAQAccordion() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('faq-open');
                
                // Close all other FAQ items
                document.querySelectorAll('.faq-item.faq-open').forEach(openItem => {
                    if (openItem !== item) {
                        openItem.classList.remove('faq-open');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('faq-open');
                
                // Rotate icon
                if (icon) {
                    icon.style.transform = item.classList.contains('faq-open') 
                        ? 'rotate(45deg)' 
                        : 'rotate(0deg)';
                }
            });
        }
    });
}

// Reality Check Toggles
function initializeRealityToggles() {
    document.querySelectorAll('[data-reality]').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-reality');
            const truthElement = document.getElementById(targetId);
            
            if (truthElement) {
                // Toggle visibility
                truthElement.classList.toggle('hidden');
                
                // Update button text
                const isHidden = truthElement.classList.contains('hidden');
                this.textContent = isHidden ? 'Show Reality' : 'Hide Reality';
                
                // Add some visual feedback
                this.classList.toggle('reality-revealed', !isHidden);
            }
        });
    });
}

// Blog Features
function initializeBlogFeatures() {
    console.log('Blog features initialized');
    
    // Load blog posts if on blog index page
    const blogPostsContainer = document.getElementById('blog-posts');
    const loadingElement = document.getElementById('loading');
    
    if (blogPostsContainer) {
        loadBlogPosts();
    }
    
    // Reading time calculator for article pages
    const content = document.querySelector('.article-content');
    if (content) {
        const wordCount = content.textContent.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Average reading speed
        
        const timeElement = document.querySelector('.read-time');
        if (timeElement) {
            timeElement.textContent = `${readingTime} min read`;
        }
    }
    
    function loadBlogPosts() {
        // Static blog posts data - in production this would come from a CMS or API
        const blogPosts = [
            {
                title: "How AI Automation Generated $75K+ Monthly ROI: Real Case Study",
                excerpt: "Detailed breakdown of how we implemented AI automation systems that generated over $75,000 in monthly recurring revenue for a B2B SaaS company. Complete with metrics, tools used, and step-by-step process.",
                url: "/blog/posts/ai-automation-roi-case-study.html",
                date: "January 15, 2024",
                category: "Case Study",
                readTime: "8 min"
            }
        ];
        
        // Hide loading and show posts
        if (loadingElement) loadingElement.style.display = 'none';
        
        blogPosts.forEach(post => {
            const postHTML = `
                <article class="blog-post-card">
                    <div class="post-meta">
                        <span class="post-category">${post.category}</span>
                        <span>${post.date}</span>
                    </div>
                    <h2 class="post-title">
                        <a href="${post.url}">${post.title}</a>
                    </h2>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-footer">
                        <a href="${post.url}" class="read-more">Read full article →</a>
                        <span class="read-time">${post.readTime} read</span>
                    </div>
                </article>
            `;
            
            blogPostsContainer.insertAdjacentHTML('beforeend', postHTML);
        });
    }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Generic function to safely get elements
function safeQuerySelector(selector) {
    return document.querySelector(selector);
}

function safeQuerySelectorAll(selector) {
    return document.querySelectorAll(selector);
}

// Debug helper
function debugLog(message, data = null) {
    if (console && typeof console.log === 'function') {
        if (data) {
            console.log(`[SystemHustle Debug] ${message}:`, data);
        } else {
            console.log(`[SystemHustle Debug] ${message}`);
        }
    }
}

// Export for potential module use
if (typeof window !== 'undefined') {
    window.SystemHustleJS = {
        version: '2.0',
        initializeThemeToggle,
        initializeMobileMenu,
        initializeScrollFeatures,
        initializeAnimations,
        initializeContactButtons,
        debugLog
    };
}