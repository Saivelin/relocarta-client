/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-sans'],
    },
    extend: {
      colors: {
        primary: '#1890ff',
        'primary-light': '#E6F7FF',
        accent: '#248742',
        'accent-light': '#6dc682',
        'accent-lighter': '#6DC6821A',
      },
      boxShadow: {
        sidebar: '0 4px 16px 0 rgba(0, 32, 51, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.02)',
      },
      screens: {
        sm: '480px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
