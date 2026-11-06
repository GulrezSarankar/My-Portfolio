/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#080612',
        'dark-section': '#100B20',
        'dark-card': '#120D24',
        'dark-elevated': '#181230',
        'dark-border': 'rgba(255, 255, 255, 0.12)',
        'midnight': '#080612',
        'midnight-surface': '#100B20',
        'purple-primary': '#9B5CFF',
        'purple-accent': '#D66BFF',
        'purple-soft': 'rgba(155, 92, 255, 0.15)',
        'purple-glow': 'rgba(155, 92, 255, 0.25)',
        'accent-blue': '#9B5CFF',
        'accent-blue-hover': '#8644E6',
        'accent-light': '#D66BFF',
        'accent-soft': 'rgba(155, 92, 255, 0.12)',
        'text-primary': '#FFFFFF',
        'text-secondary': '#AAA5B8',
        'text-muted': '#787389',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        code: ['"Fira Code"', 'monospace'],
      },
      maxWidth: {
        'site': '1280px',
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
