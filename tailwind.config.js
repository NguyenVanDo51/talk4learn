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
        primary: '#4096ff',
        muted: '#a1a1a1',
      },
      spacing: {
        inline: '0.5rem',
        normal: '1rem',
        large: '1.5rem',
      },
    },
  },
  plugins: [],
}
