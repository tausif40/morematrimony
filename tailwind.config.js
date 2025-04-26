/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f21a2d",
        // secondary: "#6735da",
        gold: "#f8c928",
        text: "#a8a9a9",
        headingGray: "#6d6e6f",
        textGray: "#303030",
        black: "#111723",
        hotRed: "#f21a2d",
      }
    },
  },
  plugins: [],
}