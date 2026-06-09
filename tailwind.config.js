/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        // Renamed to 'scroll' for the seamless component loop
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        // Ensure the component uses className="animate-scroll"
        scroll: "scroll 40s linear infinite",
        'spin-slow': 'spin 3s linear infinite', 
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', 
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};