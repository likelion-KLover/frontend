/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins-Regular', 'sans-serif'],
        'poppins-bold': ['Poppins-Bold', 'sans-serif'],
        'poppins-medium': ['Poppins-Medium', 'sans-serif'],
        'poppins-semibold': ['Poppins-SemiBold', 'sans-serif'],
        'poppins-light': ['Poppins-Light', 'sans-serif'],
        'poppins-extrabold': ['Poppins-ExtraBold', 'sans-serif'],
      },
      colors: {
        background: '#F2F0FC',
        primary: '#5843be',
        secondary: '#0a0521',
        white: '#ffffff',
        black: '#111111',
        gray: {
          200: '#f8f8f8',
          300: '#d3d3d3',
          400: '#6c757d',
          500: '#333333',
        },
      },
    },
  },
  plugins: [],
};
