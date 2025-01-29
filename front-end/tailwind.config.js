/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {           
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                wiggle: 'wiggle 1s ease-in-out infinite',
                'ping-slow': 'ping 3s linear infinite',
                glossy: 'glossy 6s ease infinite',
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'fade-in-up': 'fadeInUp 0.5s ease-in-out',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                glossy: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                }, 
                   fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            colors: {
                background: {
                    DEFAULT: '#1d3435', // Primary background color
                    dark: '#011717', // Darker shade
                    light: '#244244', // Lighter shade
                },
                primary: {
                    DEFAULT: '#4F46E5', // Vibrant accent
                    light: '#6366F1', // Slightly lighter
                    dark: '#3730A3', // Slightly darker
                },
                secondary: {
                    DEFAULT: '#F59E0B', // Warm secondary color
                    light: '#FBBF24',
                    dark: '#B45309',
                },
                accent: {
                    DEFAULT: '#0CC4D3', // Cyan for highlights
                    light: '#5EEAD4', // Softer cyan
                    dark: '#0E7490', // Deeper cyan
                    secondary: '#e32ef6', // pink
                },
                text: {
                    primary: '#E5E7EB', // Light gray text
                    secondary: '#9CA3AF', // Muted gray text
                    muted: '#6B7280', // More opacity
                },
                border: {
                    DEFAULT: '#334E4F', // Border color for elements
                    light: '#4D6D6E', // Slightly lighter
                },
                muted: '#171919', // Semi-transparent white
            },
            cursor: {
                default: 'url(assets/elements/cursor.png), default',

                // pointer: 'url(/images/cursor.png), pointer',
            },
            animation: {
                first: 'moveVertical 30s ease infinite',
                second: 'moveInCircle 20s reverse infinite',
                third: 'moveInCircle 40s linear infinite',
                fourth: 'moveHorizontal 40s ease infinite',
                fifth: 'moveInCircle 20s ease infinite',
            },
            boxShadow: {
                'box-glow': '0 0 30px 15px rgba(0, 255, 255, 0.5)',
                'question-glow': '0 0 20px 10px rgba(0, 255, 255, 0.8)',
                cone: '0px -200px 200px 50px rgba(0, 255, 255, 0.6)',
            },
            backgroundImage: {
                'conic-gradient':
                    'conic-gradient(from 180deg at 50% 50%, rgba(0, 255, 255, 0.2), rgba(0, 0, 0, 0))',
            },

            keyframes: {
                moveHorizontal: {
                    '0%': {
                        transform: 'translateX(-50%) translateY(-10%)',
                    },
                    '50%': {
                        transform: 'translateX(50%) translateY(10%)',
                    },
                    '100%': {
                        transform: 'translateX(-50%) translateY(-10%)',
                    },
                },
                moveInCircle: {
                    '0%': {
                        transform: 'rotate(0deg)',
                    },
                    '50%': {
                        transform: 'rotate(180deg)',
                    },
                    '100%': {
                        transform: 'rotate(360deg)',
                    },
                },
                moveVertical: {
                    '0%': {
                        transform: 'translateY(-50%)',
                    },
                    '50%': {
                        transform: 'translateY(50%)',
                    },
                    '100%': {
                        transform: 'translateY(-50%)',
                    },
                },
            },
        },
    },
    plugins: [
        // require('tailwind-scrollbar'),
        // require('tailwind-scrollbar-hide'),
    ],
}
