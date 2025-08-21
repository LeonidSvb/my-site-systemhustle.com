// Global Site Configuration
const SITE_CONFIG = {
    // Contact Information
    calendly: 'https://calendly.com/standartdevelop/30min',
    whatsapp: '+6281757575553',
    whatsappUrl: 'https://wa.me/6281757575553?text=Hi%20Leo%2C%20I%27m%20interested%20in%20AI%20automation%20services',
    email: 'leo@systemhustle.com',
    emailUrl: 'mailto:leo@systemhustle.com?subject=AI%20Automation%20Inquiry',
    
    // Social Links
    github: 'https://github.com/leoshvorob', // Update with actual GitHub
    linkedin: 'https://linkedin.com/in/leoshvorob', // Update with actual LinkedIn
    
    // Business Information
    businessName: 'SystemHustle',
    tagline: 'AI Automation Specialist',
    location: 'Bali, Indonesia',
    timezone: 'GMT+8',
    
    // Branding & Visual Identity
    branding: {
        logo: {
            text: 'SystemHustle',
            icon: '', // Remove extra S letter
            favicon: '/images/favicon.svg',
            symbol: '' // Remove symbol from logo
        },
        colors: {
            primary: '#3B82F6',
            secondary: '#1E293B',
            accent: '#10B981'
        }
    },
    
    // Site Metadata
    siteUrl: 'https://systemhustle.com',
    authorName: 'Leonid Shvorob',
    authorImage: 'https://i.imgur.com/GjB3Hlw.jpeg',
    
    // Analytics & Tracking (for future use)
    // googleAnalytics: 'GA_MEASUREMENT_ID',
    // facebookPixel: 'PIXEL_ID',
    
    // Feature Flags
    features: {
        darkMode: true,
        mobileMenu: true,
        scrollAnimations: true,
        contactForms: false, // Set to true when forms are implemented
        blog: true,
        products: true
    },
    
    // Navigation Structure - Global components everywhere
    navigation: {
        main: [
            { name: 'Home', href: '/index.html', active: 'index' },
            { name: 'About Me', href: '/about-me.html', active: 'about' },
            { name: 'Products', href: '/products/index.html', active: 'products' },
            { name: 'Blog', href: '/blog/index.html', active: 'blog' },
            { name: 'Contact', href: '/index.html#contact', active: 'contact' }
        ],
        footer: [
            { name: 'Home', href: '/index.html' },
            { name: 'About Me', href: '/about-me.html' },
            { name: 'Products', href: '/products/index.html' },
            { name: 'Blog', href: '/blog/index.html' },
            { name: 'Contact', href: '/index.html#contact' }
        ],
        legal: [
            { name: 'Privacy Policy', href: '/legal/privacy.html' },
            { name: 'Terms of Service', href: '/legal/terms.html' }
        ]
    },
    
    // Call-to-Action Buttons - Unified System (clean without emojis)
    ctas: {
        primary: {
            text: 'Book Discovery Call',
            url: 'calendly',
            classes: 'cta-primary',
            icon: ''
        },
        secondary: {
            text: 'WhatsApp',
            url: 'whatsappUrl', 
            classes: 'cta-secondary',
            icon: ''
        },
        mobile: {
            text: 'Call',
            url: 'calendly',
            classes: 'cta-mobile',
            icon: ''
        }
    },
    
    // CTA contexts removed - CTAs are now directly in HTML for better performance
    
    // Theme Configuration
    theme: {
        defaultMode: 'light',
        storageKey: 'systemhustle-theme'
    }
};

// Helper function to get CTA URL
function getCTAUrl(ctaKey) {
    const cta = SITE_CONFIG.ctas[ctaKey];
    const urlKey = cta.url;
    return SITE_CONFIG[urlKey] || cta.url;
}

// Helper function to get navigation for current page
function getNavigationForPage(currentPage) {
    return SITE_CONFIG.navigation.main.map(item => ({
        ...item,
        isActive: item.active === currentPage
    }));
}

// REMOVED: generateCTA() - CTAs are now directly in HTML

// Helper to generate mobile CTA (always visible)
function generateMobileCTA() {
    const cta = SITE_CONFIG.ctas.mobile;
    const url = getCTAUrl('mobile');
    
    return `<a href="${url}" class="${cta.classes}" data-cta="mobile">
        ${cta.icon} ${cta.text}
    </a>`;
}

// Generate universal navigation header - same everywhere!
function generateUniversalHeader() {
    const navItems = SITE_CONFIG.navigation.main;
    
    return `
    <nav class="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center">
                    <span data-brand="logo" class="text-2xl font-bold text-gray-900 dark:text-white">${SITE_CONFIG.branding.logo.text}</span>
                </div>
                
                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center space-x-8">
                    ${navItems.map(item => 
                        `<a href="${item.href}" class="nav-link text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">${item.name}</a>`
                    ).join('')}
                    <button id="themeToggle" class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-300 mr-4">
                        <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" id="themeIcon" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                        </svg>
                    </button>
                    <a href="${SITE_CONFIG.calendly}" class="cta-primary" data-cta="primary">Book Discovery Call</a>
                </div>
                
                <!-- Mobile Controls -->
                <div class="md:hidden flex items-center space-x-2">
                    <a href="${SITE_CONFIG.calendly}" class="cta-mobile" data-cta="mobile">Call</a>
                    <button id="mobileHeaderThemeToggle" class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-300">
                        <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" id="mobileHeaderThemeIcon" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 716.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                        </svg>
                    </button>
                    <button class="mobile-menu-btn p-2">
                        <div class="hamburger">
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Mobile Menu -->
        <div class="mobile-menu md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 hidden">
            <div class="px-4 py-3 text-center">
                ${navItems.map(item => 
                    `<a href="${item.href}" class="nav-link">${item.name}</a>`
                ).join('')}
                <br>
                <a href="${SITE_CONFIG.calendly}" class="cta-primary mt-3 inline-block" data-cta="calendly">Book Call</a>
            </div>
        </div>
    </nav>`;
}

// Export for module use (if needed in future)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}