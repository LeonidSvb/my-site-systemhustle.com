// Tailwind CSS Configuration for SystemHustle.com
// Extracted from inline script for better security and maintainability

tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'rotate-slow': 'rotateSlow 20s linear infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.8s ease-out',
                'fade-in': 'fadeIn 1s ease-out',
                'scale-in': 'scaleIn 0.6s ease-out',
                'geometric': 'geometric 15s ease-in-out infinite',
                'slide-in-left': 'slideInLeft 0.8s ease-out',
                'slide-in-right': 'slideInRight 0.8s ease-out',
                'bounce-in': 'bounceIn 0.6s ease-out',
                'fade-in-up': 'fadeInUp 0.8s ease-out',
                'reveal': 'reveal 0.8s ease-out forwards'
            },
            keyframes: {
                float: { 
                    '0%, 100%': { transform: 'translateY(0px)' }, 
                    '50%': { transform: 'translateY(-20px)' } 
                },
                rotateSlow: { 
                    '0%': { transform: 'rotate(0deg)' }, 
                    '100%': { transform: 'rotate(360deg)' } 
                },
                pulseGlow: { 
                    '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }, 
                    '100%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)' } 
                },
                slideUp: { 
                    '0%': { transform: 'translateY(50px)', opacity: '0' }, 
                    '100%': { transform: 'translateY(0)', opacity: '1' } 
                },
                fadeIn: { 
                    '0%': { opacity: '0' }, 
                    '100%': { opacity: '1' } 
                },
                scaleIn: { 
                    '0%': { transform: 'scale(0.9)', opacity: '0' }, 
                    '100%': { transform: 'scale(1)', opacity: '1' } 
                },
                slideInLeft: { 
                    '0%': { transform: 'translateX(-50px)', opacity: '0' }, 
                    '100%': { transform: 'translateX(0)', opacity: '1' } 
                },
                slideInRight: { 
                    '0%': { transform: 'translateX(50px)', opacity: '0' }, 
                    '100%': { transform: 'translateX(0)', opacity: '1' } 
                },
                bounceIn: { 
                    '0%': { transform: 'scale(0.3)', opacity: '0' }, 
                    '50%': { transform: 'scale(1.05)' }, 
                    '70%': { transform: 'scale(0.9)' }, 
                    '100%': { transform: 'scale(1)', opacity: '1' } 
                },
                fadeInUp: { 
                    '0%': { transform: 'translateY(30px)', opacity: '0' }, 
                    '100%': { transform: 'translateY(0)', opacity: '1' } 
                },
                reveal: { 
                    '0%': { opacity: '0', transform: 'translateY(50px)' }, 
                    '100%': { opacity: '1', transform: 'translateY(0)' } 
                },
                geometric: { 
                    '0%, 100%': { transform: 'rotate(0deg) scale(1)' }, 
                    '25%': { transform: 'rotate(90deg) scale(1.1)' },
                    '50%': { transform: 'rotate(180deg) scale(0.9)' },
                    '75%': { transform: 'rotate(270deg) scale(1.1)' }
                }
            }
        }
    }
};