/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: 'body',
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.center': {
          display: 'flex;',
          'align-items': 'center;',
          'justify-content': 'center;',
        },
      })
    }),
  ],
  safelist: [],
  theme: {
    container: {
      center: true,
    },
    extend: {
      height: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      fontSize: {
        '2xs': ['0.625rem', '1rem'],
      },
      colors: {
        secondary: '#E5DDCB',
        disable: '#717171',
        background: '#010101',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
}
