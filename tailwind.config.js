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
        'dark-bg': '#0B111A',
        'dark-section': '#101722',
        'dark-card': '#141C27',
        'dark-elevated': '#182230',
        'dark-border': '#263241',
        'accent-blue': '#3B82F6',
        'accent-blue-hover': '#2563EB',
        'accent-light': '#60A5FA',
        'accent-soft': '#172A46',
        'text-primary': '#F5F7FA',
        'text-secondary': '#A8B2C1',
        'text-muted': '#6F7B8B',
      },
      fontFamily: {
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
