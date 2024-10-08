/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}', // Add this line if you have a components directory
    './pages/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{js,ts,jsx,tsx}', // Add this line if you have a public directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
