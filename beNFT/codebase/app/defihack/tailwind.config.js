const colors = require('tailwindcss/colors')
const dudaPic = 

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: '#191926',
        primary: {
          dark: '#589A5D',
          DEFAULT: '#6FC175',
          light: '#6FC375'
        }
      },
      fontFamily: {
        'sans': ['Montserrat', 'Helvetica', 'Arial', 'sans-serif']
      },
      dropShadow: {
        'green': '0 0 4px rgba(111, 195, 117, 0.5)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
