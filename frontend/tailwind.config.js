const colors = require("tailwindcss/colors");
delete colors["lightBlue"];

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      ...colors,
      sky: colors.lightBlue,
    },
    extend: {
      fontFamily: {
        sans: ["Poppins"],
      },
      cursor: {
        crosshair: "crosshair",
        "zoom-in": "zoom-in",
        "zoom-out": "zoom-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    container: false,
  },
};
