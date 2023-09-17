/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(132, 216, 255)',
        'bg-primary': 'rgb(221, 244, 255)',
        active: 'rgb(28, 176, 246)',
      },
      spacing: {
        inline: '0.5rem',
        normal: '1rem',
        large: '1.5rem',
      },
    },
  },
  important: true,
  plugins: [],
}
