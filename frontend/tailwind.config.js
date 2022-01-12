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
  plugins: [],
  corePlugins: {
    container: false,
  },
};
