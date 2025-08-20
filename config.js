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
            icon: 'S', // Single letter for compact display
            favicon: '/images/favicon.svg',
            symbol: `<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>`
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
    
    // Navigation Structure
    navigation: {
        main: [
            { name: 'Home', href: '/', active: 'index' },
            { name: 'Services', href: '/#services', active: 'index' },
            { name: 'Reality', href: '/#reality', active: 'index' },
            { name: 'About Me', href: '/about-me', active: 'about' },
            { name: 'Process', href: '/#process', active: 'index' },
            { name: 'Blog', href: '/blog', active: 'blog' },
            { name: 'Contact', href: '/#contact', active: 'index' }
        ]
    },
    
    // Call-to-Action Buttons
    ctas: {
        primary: {
            text: 'Book Discovery Call',
            url: 'calendly', // References SITE_CONFIG.calendly
            classes: 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-all duration-300'
        },
        secondary: {
            text: 'WhatsApp',
            url: 'whatsappUrl', // References SITE_CONFIG.whatsappUrl
            classes: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300'
        }
    },
    
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

// Export for module use (if needed in future)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}