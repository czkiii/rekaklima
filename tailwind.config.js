/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        script: ['Dancing Script', 'cursive'],
      },
      colors: {
        cream: {
          DEFAULT: '#F9F5F1',
          dark: '#FDF9F6',
        },
      },
    },
  },
  plugins: [],
}

