/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2", // Celeste Disney
        secondary: "#AECBFA", // Azul pastel
        accent: "#FFB6C1", // Rosa suave
        background: "#F0F4FA", // Gris azulado claro
        text: "#2C3E50", // Azul oscuro
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
