/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ['turq-5']: '#004567',
        ['turq-4']: '#005A86',
        ['turq-3']: '#0072A9',
        ['turq-2']: '#00A2F1',
        ['turq-1']: '#0AACFB',
      },
    },
  },
  plugins: [],
};
