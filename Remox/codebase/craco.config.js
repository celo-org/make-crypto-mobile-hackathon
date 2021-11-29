module.exports = {
    style: {
      postcss: {
        plugins: [
          //require('tailwindcss'),
          //require('autoprefixer'),
        ],
      },
    },
    webpack: {
      configure: {
          module: {
              rules: [
                  {
                      type: 'javascript/auto',
                      test: /\.mjs$/,
                      include: /node_modules/,
                  },
              ],
          },
      },
  },
  }