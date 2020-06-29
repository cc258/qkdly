const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const output = {
  publicPath: "/",
  path: path.resolve(__dirname, "../static/dist"),
  filename: "[name].js",
  chunkFilename: "[name].js"
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
            "@babel/preset-typescript",
            "@babel/preset-react"
          ],
          plugins: [
            // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            "react-hot-loader/babel"
          ]
        }
      }
    },
    {
      test: /\.(sc|sa|c)ss$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: "url-loader",
          options: { limit: 100 }
        }
      ]
    }
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
    template: path.resolve(__dirname, "../static/src/index.html")
  }),

  //开启模块热更新，热加载和模块热更新不同，热加载是整个页面刷新
  //别加这一句，会报错： HMR模块热更新出现的错误
  //Uncaught RangeError: Maximum call stack size exceeded
  new webpack.HotModuleReplacementPlugin()

  // new OpenBrowserPlugin({ url: 'http://localhost:8081' }), // 自动打开浏览器
];

const files = fs.readdirSync(path.resolve(__dirname, "../static/dll"));
files.forEach(file => {
  if (/.*\.dll.js/.test(file)) {
    plugins.push(
      new AddAssetHtmlWebpackPlugin({
        // 将dll.js文件自动引入html
        filepath: path.resolve(__dirname, "../static/dll", file)
      })
    );
  }
  if (/.*\.manifest.json/.test(file)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        // 当打包第三方库时，会去manifest.json文件中寻找映射关系，如果找到了那么就直接从全局变量(即打包文件)中拿过来用就行，不用再进行第三方库的分析，以此优化打包速度
        manifest: path.resolve(__dirname, "../static/dll", file)
      })
    );
  }
});

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
    "react-hot-loader": path.resolve(
      path.join(__dirname, "../node_modules/react-hot-loader")
    ),
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
