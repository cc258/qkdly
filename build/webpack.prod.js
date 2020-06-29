const path = require("path");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const productConfig = {
  mode: "production",
  entry: [path.resolve(__dirname, "../static/src/index.tsx")]
};

module.exports = merge(commonConfig, productConfig);
