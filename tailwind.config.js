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
        display: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        "background-dark": "#FFFFFF",
        "background-light": "#FFFFFF",
        "background-medium": "#FFFFFF",
        primary: "#1B1B12",
        secondary: "#4A4A3D",
        muted: "#84846C",
        accent: "#2663EB",
        "accent-deep": "#1B4FD0",
        emerald: "#0FA06B",
        "emerald-deep": "#0B7A50",
        electric: "#22d3ee",
        "border-color": "rgba(27, 27, 18, 0.12)",
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
          "0%, 100%": { boxShadow: '0 0 15px rgba(38, 99, 235, 0.4)' },
          "50%": { boxShadow: '0 0 30px rgba(38, 99, 235, 0.8)' },
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
