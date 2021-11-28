module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#FF7348",
        greylish: "#707070"
      },
      boxShadow: {
        custom: "0px 2px 7px 0px #dad8d8"
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
