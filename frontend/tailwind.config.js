/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfaf5',
          100: '#faf4e8',
          200: '#f5e8d0',
          300: '#edd5b0',
          400: '#e3bc88',
          500: '#d9a065',
        },
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        blush: {
          50: '#fff5f7',
          100: '#ffe0e8',
          200: '#ffc1d3',
          300: '#ff9ab8',
          400: '#ff6b9d',
        },
        mauve: '#9b8ea0',
        ivory: '#fffff0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Cormorant Garamond"', '"Lato"', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
        body: ['"Lato"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f5e8d0 0%, #eab308 50%, #ca8a04 100%)',
        'rose-gradient': 'linear-gradient(135deg, #ffeef3 0%, #fda4af 50%, #fb7185 100%)',
        'hero-overlay': 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'petal-fall': 'petal-fall 8s ease-in infinite',
        'count-up': 'count-up 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'petal-fall': {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(234, 179, 8, 0.3)',
        'rose': '0 4px 24px rgba(253, 164, 175, 0.4)',
        'luxury': '0 8px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(234,179,8,0.2)',
      },
    },
  },
  plugins: [],
}
