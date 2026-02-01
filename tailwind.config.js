/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "background-dark": "#f1f5f9",
        "background-light": "#ffffff",
        "background-medium": "#f8fafc",
        primary: "#0f172a",
        secondary: "#475569",
        accent: "#2563eb",
        "border-color": "rgba(0, 0, 0, 0.1)",
      },
      boxShadow: {
        "card-1": "0px 0px 40px 0px rgba(0, 0, 0, 0.08)",
        "card-2": "0px 10px 20px 0 rgba(0, 0, 0, 0.08)",
      },
      keyframes: {
        "zoom-in-out": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        "text-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: '0 0 15px rgba(37, 99, 235, 0.4)' },
          "50%": { boxShadow: '0 0 30px rgba(37, 99, 235, 0.8)' },
        },
      },
      animation: {
        "zoom-in-out": "zoom-in-out 20s ease-in-out infinite",
        "text-pulse": "text-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
