module.exports = {
    mode: 'jit',
    content: [
        './index.html',
        './src/**/*.{svelte,js,ts}',
        // etc.
      ],
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
    theme: {
      colors: {
        'blue': '#003867',
        'black': '#000',
        'white': '#fff',
        'gray': '#f5f5f5',
        'darkgray': '#CCCCCC',
        'brown': '#644536',
        'lightblue': '#3590f3',
        'darkred': '#b2675e',
        'red': '#C3465B',
        'green': '#3DB88F'
      }
    }
  }