const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, '/'),
    filename: 'webpack-bundle.js'
  },
  node: {
   fs: "empty"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.png/,
        loader: 'url-loader'
      },
      {
        test: /\.otf/,
        loader: 'url-loader'
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      }
    ]
  },
}
