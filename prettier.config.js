const tailwind = require('prettier-plugin-tailwindcss');
const akrc = require('prettier-config-akrc');

module.exports = {
  ...akrc,
  plugins: [tailwind]
};
