module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.tsx',
    './src/**/*.ts'
  ],
  theme: {
    fontFamily: {
      'sans': ['Roboto Condensed', 'sans-serif'],
      'heading': ['Eczar', 'serif'],
      'body': ['Roboto Condensed', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#304FFE',
        primaryVariant: '#1A237E',
        secondary: '',
        secondaryVariant: '',
      }
    },
  },
  variants: {
    borderWidth: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
}
