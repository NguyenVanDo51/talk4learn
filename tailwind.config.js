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
        primary: 'var(--primary)',
        muted: '#a1a1a1',
        'dark-main': 'var(--main-bg)',
        'dark-active-main-bg': 'var(--main-active-bg)',
        'dark-primary': 'var(--primary)',
        'dark-line': 'var(--line-color)',
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
