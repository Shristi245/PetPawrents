import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#56A6B8",
      },
    },
  },
  plugins: [],
});
