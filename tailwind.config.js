/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
  ],
  theme: {
    extend: {
      colors: {
        velix: {
          primary: '#1a2e26', // Forest Green
          accent: '#D6825C',  // Soft Orange
          bg: '#F9FBF9',      // Light Greenish White
          surface: '#FFFFFF',
          text: '#1a2e26',
          muted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}