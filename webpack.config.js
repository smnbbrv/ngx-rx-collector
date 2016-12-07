let path = require('path'),
    webpack = require('webpack');

module.exports = {
  entry: path.resolve('./app/main'),
  output: {
    filename: '/build/bundle.js'
  },
  resolve: {
    root: [
      path.resolve('./app')
    ],
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [
      { test: /\.ts/, loaders: ['ts'], exclude: /node_modules/ }
    ]
  },
  devServer: {
    historyApiFallback: true,
    port: 3000
  }
};
