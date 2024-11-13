/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // Путь к вашему приложению
    "./src/components/**/*.{js,ts,jsx,tsx}", // Путь к вашим компонентам
    "./src/styles/**/*.{css}", // Путь к вашим стилям
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
