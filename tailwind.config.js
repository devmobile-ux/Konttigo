/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF4EC",
          100: "#FFE6D5",
          200: "#FFCCAA",
          300: "#FFB380",
          400: "#FF9954",
          500: "#FF8832",
          600: "#E6762C",
          700: "#CC6626",
        },
        background: "#F5F1EA",
        textPrimary: "#1A1A1A",
        textSecondary: "#6B7280",
        borderColor: "#E5E7EB",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
};