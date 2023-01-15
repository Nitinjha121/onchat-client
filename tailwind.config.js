/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: { primaryColor: "#0066ffe1" },
      boxShadow: {
        "elevation-high": "0 8px 16px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
