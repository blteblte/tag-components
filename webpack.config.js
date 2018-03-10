const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')
// var webpack = require('webpack')

module.exports = {

  /* entry points */
  entry: {
    'wrsts-tab-control': './src/components/wrsts-tab-control/wrsts-tab-control.ts'
  },

  /* js output */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },

  /* loaders */
  module: {
    rules :[
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: MiniCssExtractPlugin.loader
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  /* plugins */
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ],

  // stats: {
  //     colors: true
  // },
  // devtool: 'source-map',

  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   compress: false,
  //   port: 9000
  // }
};