const path = require("path");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const productConfig = {
  mode: "production",
  entry: [path.resolve(__dirname, "../src/index.js")]
};

module.exports = merge(commonConfig, productConfig);
