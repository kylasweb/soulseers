
// Custom plugin to add 'cyber' variant
const plugin = require('tailwindcss/plugin')

module.exports = plugin(function({ addVariant }) {
  // Add a 'cyber' variant that targets elements within parent with class 'cyber'
  addVariant('cyber', '.cyber &')
})
