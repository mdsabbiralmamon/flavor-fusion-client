import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "'Montserrat', sans-serif", // Adds a new `Montserrat` class
        courgette: "'Courgette', cursive", // Adds a new `Courgette` class 
      },
    },
  },
  plugins: [daisyui],
}

