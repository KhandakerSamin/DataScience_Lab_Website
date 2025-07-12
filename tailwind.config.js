module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#39B24A', // Primary accent for backgrounds, badges
        action: '#09509E', // Action/link/hover color
        textDark: '#1E1E1E', // Primary text
        textSecondary: '#555555', // Secondary text
        divider: '#E0E0E0', // Divider lines and borders
        background: '#F9F9F9', // Page background
      },
    },
  },
  plugins: [],
}