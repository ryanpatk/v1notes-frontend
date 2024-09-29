/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        turq: 'rgb(0, 113, 169)',
      },
    },
  },
  plugins: [],
};
