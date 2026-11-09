/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Heebo', 'serif'],
        sans: ['Heebo', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
      colors: {
        ink: '#1c1f26',
        cream: {
          50: '#fffdf8',
          100: '#fdf6e9',
          200: '#f9ecd2',
          300: '#f2dba8',
        },
        party: {
          50: '#fff5f7',
          100: '#ffe4ec',
          200: '#ffc9dd',
          300: '#ff9ac0',
          400: '#ff5e9c',
          500: '#ec3a7e',
          600: '#cf2261',
          700: '#ab1649',
          800: '#8a123c',
          900: '#6f1032',
        },
        ocean: {
          50: '#f0fbff',
          100: '#dcf5ff',
          200: '#b6eaff',
          300: '#76d8ff',
          400: '#2cc1ff',
          500: '#01a4ee',
          600: '#0083cb',
          700: '#0167a4',
          800: '#065888',
          900: '#0b4a6f',
        },
        confetti: {
          yellow: '#ffd54a',
          green: '#3ad6a8',
          blue: '#3aa5ff',
          coral: '#ff6b5b',
          purple: '#b984ff',
          orange: {
            50: '#fff5ed',
            100: '#ffe8d5',
            200: '#ffd0a8',
            300: '#ffb070',
            400: '#ff8c3a',
            500: '#f97316',
            600: '#e25b0a',
            700: '#bd4708',
            800: '#98390f',
            900: '#7c320f',
          },
        },
      },
      boxShadow: {
        card: '0 8px 30px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(15, 23, 42, 0.04)',
        float: '0 20px 60px rgba(15, 23, 42, 0.12), 0 8px 24px rgba(15, 23, 42, 0.06)',
      },
      keyframes: {
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.3s ease both',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
