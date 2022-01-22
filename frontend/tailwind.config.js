const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
      },
      fontFamily: {
        sans: ["Inter", "Poppins"],
      },
      cursor: {
        crosshair: "crosshair",
        "zoom-in": "zoom-in",
        "zoom-out": "zoom-out",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.larger-container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen lg': {
            maxWidth: '1224px',
          },
          '@screen xl': {
            maxWidth: '1568px',
          },
          '@screen 2xl': {
            maxWidth: '1568px',
          }
        }
      })
    }
  ],
  corePlugins: {
    container: false,
  },
};
