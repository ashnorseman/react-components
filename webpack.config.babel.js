/**
 * Created by AshZhang on 15/9/11.
 */


'use strict';

var path = require('path'),
    webpack = require('webpack'),
    CleanPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HTMLPlugin = require('html-webpack-plugin'),
    PACKAGE = require('./package.json'),
    ROOT_PATH = path.resolve(__dirname),
    TARGET = process.env.npm_lifecycle_event,
    template = new HTMLPlugin({
      description: PACKAGE.description,
      template: './templates/index.tpl'
    }),
    isDev = (TARGET === 'dev');


// Development
// ---------------------------

if (TARGET === 'start' || TARGET === 'dev') {

  module.exports = {
    devServer: {
      colors: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    devtool: 'eval-source-map',
    entry: path.resolve(ROOT_PATH, isDev ? 'src/modules.jsx' : 'src/app.jsx'),
    module: {
      loaders: [
        {
          test: /\.(le|c)ss$/,
          loaders: ['style', 'css', 'less'],
          includes: [
            path.resolve(ROOT_PATH, 'node_modules/normalize.css'),
            path.resolve(ROOT_PATH, 'src')
          ]
        },
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel'],
          include: path.resolve(ROOT_PATH, 'src')
        }
      ],
      preLoaders: [
        {
          test: /\.jsx?$/,
          loader: 'eslint-loader',
          include: path.resolve(ROOT_PATH, 'src')
        }
      ]
    },
    plugins: [
      template,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
}


// Production
// ---------------------------

if (TARGET === 'build') {

  module.exports = {
    devtool: 'source-map',
    entry: {
      app: path.resolve(ROOT_PATH, 'src/app.jsx'),
      libs: ['es6-promise', 'react', 'react-router', 'whatwg-fetch']
    },
    output: {
      path: path.resolve(ROOT_PATH, 'build'),
      filename: 'app.[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test: /\.(le|c)ss$/,
          loader: ExtractTextPlugin.extract('style', 'css!less'),
          includes: [
            path.resolve(ROOT_PATH, 'node_modules/normalize.css'),
            path.resolve(ROOT_PATH, 'src')
          ]
        },
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: path.resolve(ROOT_PATH, 'src')
        }
      ]
    },
    plugins: [
      template,
      new CleanPlugin(['build']),
      new ExtractTextPlugin('style.[contenthash].css'),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.CommonsChunkPlugin(
        'libs',
        'libs.[chunkhash].js'
      ),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
}