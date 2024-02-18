/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1E1B4B",
        ecomAcsend: "#2e66f6",
        ecomBlack: "#263238",
        ecomGrey: "#78889b",
      },
      container: {
        center: true,
        padding: "1rem",
      },
      screens: {
        xxs: "375px",
        xs: "425px",
        sm: "576px",

        md: "769px",

        lg: "992px",

        xl: "1200px",

        "2xl": "1400px",
        "3xl": "1900px",
      },
      fontSize: {
        xxs: ".35rem",
        xs: ".55rem",
        sm: ".75rem",
      },
    },
  },
  plugins: [],
};
