const colors = require("tailwindcss/colors");
delete colors["lightBlue"];

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    options: {
      safelist: [/(bg)-(.*)-(\\d{1}0{1,2})/],
    },
  },
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
    extend: {
      flexDirection: ["even"],
    },
  },
  plugins: [],
  corePlugins: {
    container: false,
  },
};
