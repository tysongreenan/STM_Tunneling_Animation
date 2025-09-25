/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0a',
        'purple-glow': '#8b5cf6',
        'pink-glow': '#ec4899',
        'cyan-glow': '#06b6d4',
        'white-glow': '#f8fafc',
        'green-glow': '#10b981',
        'yellow-glow': '#f59e0b',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'tunnel': 'tunnel 1s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { opacity: '0.6', transform: 'scale(1)' },
          '100%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'tunnel': {
          '0%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
          '100%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}
