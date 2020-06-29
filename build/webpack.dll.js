const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    vendors: [
      "axios",
      "prop-types",
      "react",
      "react-dom",
      "react-intl",
      "react-leaflet",
      "react-redux",
      "react-router-dom",
      "redux",
      "redux-thunk"
    ]
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "../static/dll"),
    library: "[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]",
      path: path.resolve(__dirname, "../static/dll/[name].manifest.json")
    })
  ]
};
