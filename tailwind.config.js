/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#915EFF",
        secondary: "#1A1A1A",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(135deg, #0F0F0F, #1A1A1A, #161623)",
      },
    },
  },
  plugins: [],
};
