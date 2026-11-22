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
        // Core Minimal Editorial Design System
        'page': '#0D0D0D',
        'surface': '#141414',
        'surface-elevated': '#1A1A1A',
        'border-subtle': '#262626',
        'border-hover': '#383838',
        'text-primary': '#F5F5F5',
        'text-secondary': '#A1A1A1',
        'text-muted': '#666666',
        'lime-accent': '#A3E635',
        'lime-hover': '#BEF264',
        'lime-soft': 'rgba(163, 230, 53, 0.12)',
        'lime-border': 'rgba(163, 230, 53, 0.25)',

        // Backward compatibility mappings for existing component class references
        'dark-bg': '#0D0D0D',
        'dark-section': '#0D0D0D',
        'dark-card': '#141414',
        'dark-elevated': '#1A1A1A',
        'dark-border': '#262626',
        'midnight': '#0D0D0D',
        'midnight-surface': '#141414',
        'purple-primary': '#A3E635',
        'purple-accent': '#BEF264',
        'purple-soft': 'rgba(163, 230, 53, 0.10)',
        'purple-glow': 'transparent',
        'accent-blue': '#A3E635',
        'accent-blue-hover': '#BEF264',
        'accent-light': '#BEF264',
        'accent-soft': 'rgba(163, 230, 53, 0.10)',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Fira Code"', 'ui-monospace', 'monospace'],
        code: ['"Fira Code"', 'monospace'],
      },
      maxWidth: {
        'site': '1280px',
        'prose-narrow': '720px',
      },
      borderRadius: {
        'editorial': '8px',
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
