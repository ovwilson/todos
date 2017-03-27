var webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  commonConfig = require('./webpack.common.js'),
  helpers = require('./helpers'),
  env = require('./environment');

module.exports = webpackMerge(commonConfig, {

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'apiKey': JSON.stringify(process.env.apiKey),
        'authDomain': JSON.stringify(process.env.authDomain),
        'databaseURL': JSON.stringify(process.env.databaseURL),
        'storageBucket': JSON.stringify(process.env.storageBucket),
        'messagingSenderId': JSON.stringify(process.env.messagingSenderId)
      }
    })
  ]

});
