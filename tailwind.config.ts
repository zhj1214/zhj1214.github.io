/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        bento: {
          light: "#ffffff",
          dark: "#1a1a1a",
          accent: "#f3f4f6"
        }
      }
    },
  },
  plugins: [],
}
