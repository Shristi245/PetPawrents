/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brightBackground: "#FDF8EE",
        brightGreen: "#539165",
        lightText: "#959595",
        },
        fontFamily: {
          poppins: ["poetsen-one", "sans-serif"],
        },
    },
  },
  plugins: [],
}

