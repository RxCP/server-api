module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.tsx',
    './src/**/*.ts'
  ],
  theme: {
    fontFamily: {
      'sans': ['Montserrat', 'sans-serif'],
      'heading': ['Roboto Condensed', 'sans-serif'],
      'body': ['Montserrat', 'sans-serif'],
    },
    extend: {
      inset: {
        '-1/6': '-16.666667%',
      },
      colors: {
        primary: '#304FFE',
        primaryVariant: '#1A237E',
        secondary: '',
        secondaryVariant: '',
      },
      transitionProperty: {
        left: 'left',
        right: 'right'
      }
    },
  },
  variants: {
    borderWidth: ['responsive', 'hover', 'focus'],
  },
  plugins: [
    require('tailwindcss-animatecss')({
      classes: ['animate__animated', 'animate__fast', 'animate__fadeInDown', 'animate__fadeOutUp', 'animate__fadeOut', 'animate__shakeX'],
      settings: {},
      variants: ['responsive', 'hover', 'reduced-motion'],
    }),
  ],
}
