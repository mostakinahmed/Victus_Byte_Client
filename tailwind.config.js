/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        // Adding a smooth spin keyframe (standard but explicit)
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        marquee: "marquee 15s linear infinite",
        'spin-slow': 'spin 3s linear infinite', // Your slow gear animation
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', // For text
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};