'use strict'
const path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ENV = (process.env.ENV = process.env.NODE_ENV = 'production');
const conf = require('../config');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function assetsPath (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? conf.build.assetsSubDirectory
    : conf.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    polyfills: resolve('./examples/polyfills.ts'), // 依赖项入口，与主入口拆分打包
    main: resolve('./examples/main.ts'),
    vendor: resolve('./examples/vendor.ts'),
    
    //main: resolve('./examples/index.js')// 应用主入口
  },
  output: {
    path: conf.build.assetsRoot,
    // filename: '[name].js',
    // publicPath: process.env.NODE_ENV === 'production'
    //   ? conf.build.assetsPublicPath
    //   : conf.dev.assetsPublicPath
    filename: '[name].bundle.js', // 输出文件名规则
    sourceMapFilename: '[file].map', // 输出map文件规则
    chunkFilename: '[name].chunk.js' // 输出分片文件规则
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  module: {
    rules: [
      //加载css
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  optimization: {
    
  },
  node: {
    global: true,
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    fs: 'empty'
  }
}

