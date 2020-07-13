const tailwindcss = require('tailwindcss');
const CracoAlias = require("craco-alias");

module.exports = {
  style: {
    postcss: {
      plugins: [
        tailwindcss
      ],
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.paths.json"
      }
    }
  ],
  devServer: {
    "proxy": {
      "/api": "http://localhost:3001"
    },
  }
};