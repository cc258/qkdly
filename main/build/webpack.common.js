const webpack = require("webpack");
const path = require("path");
const { name: packageName } = require('../package');


const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const output = {
  publicPath: "/",
  path: path.resolve(__dirname, "../dist"),
  library: `${packageName}-[name]`,
  libraryTarget: 'umd',
  jsonpFunction: `webpackJsonp_${packageName}`,
  globalObject: 'window',
};

const webpackModule = {
  rules: [
    {
      test: /\.(j|t)sx?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            [
              "@babel/preset-env",
              { targets: { browsers: "last 2 versions" } } // or whatever your project requires
            ],
          ],
        }
      }
    },
  ]
};

const plugins = [
  /**
   * 打包后先清除dist文件，先于HtmlWebpackPlugin运行
   */
  new CleanWebpackPlugin(),
  /**
   * webpack打包进度条
   * Elegant ProgressBar and Profiler for Webpack
   * @see https://www.npmjs.com/package/webpackbar
   */
  new WebpackBar(),
  /**
   * 能够更好在终端看到webapck运行的警告和错误
   * Friendly-errors-webpack-plugin recognizes certain classes of webpack errors and cleans, aggregates and prioritizes them to provide a better Developer Experience.
   * @see https://www.npmjs.com/package/friendly-errors-webpack-plugin
   */
  new FriendlyErrorsWebpackPlugin(),

  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "../public/index.html")
  }),

];

const optimization = {
  usedExports: true,
  splitChunks: {
    chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    cacheGroups: {
      // 公共代码打包分组配置
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendors"
      }
    }
  }
};

const resolve = {
  extensions: [".tsx", ".ts", ".js", ".jsx", "json"],
  alias: {
    react: path.resolve(path.join(__dirname, "../node_modules/react"))
  }
};

const performance = {
  hints: false
};

const commonConfig = {
  // optimization,
  plugins,
  module: webpackModule,
  resolve,
  performance,
  output
};

module.exports = commonConfig;
