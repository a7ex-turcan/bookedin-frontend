/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#f4f2ee',
      },
    },
  },
  plugins: [],
  corePlugins: {
    container: true, // Ensures container utilities are included
  },
}
