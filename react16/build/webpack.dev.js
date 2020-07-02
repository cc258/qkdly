const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const devServerConfig = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: [
    path.resolve(__dirname, "../src/index.js")
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    host: '0.0.0.0',
    port: 7001,
    hot: true,
    inline: true,
    open: true,
    openPage: "http://localhost:7001",
    noInfo: true,
    historyApiFallback: true
  },
  plugins: [
    // 插件~
    new webpack.NamedModulesPlugin(), //用于启动HMR时可以显示模块的相对路径
    new webpack.DefinePlugin({
      "process.env": {
        VUEP_BASE_URL: "/"
      }
    })
  ]
};

module.exports = merge(commonConfig, devServerConfig);
