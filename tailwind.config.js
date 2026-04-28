/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        smartTeal: '#A7DADB',
        actionIndigo: '#A7DADB',
        deepSlate: '#020C1B',
        surfaceSlate: '#142433',
        secondaryText: '#b0c5c6',
      },
      fontFamily: {
        display: ['Quicksand', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
