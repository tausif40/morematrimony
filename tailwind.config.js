/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f76361",
        secondary: "#6735da",
        text: "#a8a9a9",
        headingGray: "#6d6e6f",
        black: "#111723",
        hotPink: "#fd2c79",
        pink2: "#fd655b",
      }
    },
  },
  plugins: [],
}