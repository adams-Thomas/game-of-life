/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'black-cyan': '#1e2d2f'
      }
    },
  },
  plugins: [
    plugin(function({addComponents}) {
      addComponents({
        'h1': {
          fontWeight: '700',
          fontSize: '2.25rem',
          lineHeight: '2.25rem',
          color: '#1e2d2f',
        },
        '.btn': {
          backgroundColour: 'transparent',
          border: 'solid 0.125rem #1e2d2f',
          borderRadius: '0.5rem',
          minWidth: '2.625rem',
          minHeight: '2.625rem',
          color: '#1e2d2f',
          padding: '0 0.5625rem',
          '&:hover': {
            cursor: 'pointer'
          }
        },
        '.cell': {
          height: '1rem',
          width: '1rem',
          borderTop: 'solid 1px #1e2d2f',
          borderRight: 'solid 1px #1e2d2f',
          cursor: 'pointer',
          '&:hover': {
            background: '#d3d3d3'
          }
        },
      })
    })
  ],
}
