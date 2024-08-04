let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let TerserPlugin = require("terser-webpack-plugin");
let CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
let CopyPlugin = require("copy-webpack-plugin");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "script.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  stats: {
    children: true,
  },
};
