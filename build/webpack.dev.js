const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const devServerConfig = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: [
    "react-hot-loader/patch",
    // 实现刷新浏览器webpack-hot-middleware/client?noInfo=true&reload=true 是必填的
    // webpack-hot-middleware/client?noInfo=true&reload=true
    path.resolve(__dirname, "../static/src/index.tsx")
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "../static/dist"),
    compress: true,
    host: '0.0.0.0',
    port: 8080,
    // quiet: true,
    // 重要，关于热加载的细节 https://github.com/webpack/docs/wiki/webpack-dev-server#content-base
    hot: true,
    inline: true,
    open: true,
    openPage: "http://localhost:8080",
    proxy: {
      "/api": "http://localhost:8090", // 访问本地服务器的/api路径时，代理到目标地址
      "/v1": "http://localhost:8090"
    },

    // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
    noInfo: true,
    // watchOptions: {
    //   ignored: /node_modules/
    // },
    historyApiFallback: true
  },
  plugins: [
    // 插件~
    new webpack.NamedModulesPlugin(), //用于启动HMR时可以显示模块的相对路径
    new BundleAnalyzerPlugin({ analyzerPort: 8081, openAnalyzer: false }),
    new webpack.DefinePlugin({
      "process.env": {
        VUEP_BASE_URL: "/"
      }
    })
  ]
};

module.exports = merge(commonConfig, devServerConfig);
