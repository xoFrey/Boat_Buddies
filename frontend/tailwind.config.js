/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      purple: "#CDB4DB",
      lightpink: "#FFC8DD",
      pink: "#FFAFCC",
      lightblue: "#BDE0FE",
      blue: "#A2D2FF",
      red: "red"
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
}
