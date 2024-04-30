/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // colors: {
    //   blue: "#7BDFF2",
    //   turqoise: "#B2F7EF",
    //   lightyellow: "#EFF7F6",
    //   peach: "#F7D6E0",
    //   pink: "#F2B5D4",
    // },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
