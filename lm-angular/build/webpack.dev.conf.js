'use strict'
const path = require('path');
const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackMerge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder');

const conf = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');
const packageConfig = require('../package');
const utils = require('./utils');
// const tslintConfig = require('../tslint.json');
// const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

const devWebpackConfig = webpackMerge(baseWebpackConfig, {
  mode: "development",  
  // these devServer options should be customized in /config/index.js
  devServer: {
    host: conf.dev.host,
    port: conf.dev.port,
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(conf.dev.assetsPublicPath, 'index.html') },
      ],
    },
    // 自动打开浏览器
    open: conf.dev.autoOpenBrowser,
    watchOptions: {
      poll: conf.dev.poll,
    },
    clientLogLevel: 'warning',
    // 是否热加载
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    overlay: conf.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: conf.dev.assetsPublicPath,
    quiet: true, // necessary for FriendlyErrorsPlugin
    // 跨域配置
    proxy: conf.dev.proxyTable
  },
  devtool: conf.dev.devtool,
  module: {
    rules: [
      // 加载scss
      {
        test: /\.html$/,
        use: ['raw-loader']
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
        // exclude: [path.resolve(__dirname, './examples')]
      },
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
        // exclude: [path.resolve(__dirname, './examples')]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // include: [path.resolve(__dirname, './examples')]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        // include: [path.resolve(__dirname, './examples')]
      },
      {
        // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
        // Removing this will cause deprecation warnings to appear.
        test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
        parser: { system: true },  // enable SystemJS
      },
      // 过滤错误 Remove `System.import()` usage in favor of `import()`
      // {
      //   test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
      //   use: ['@ngtools/webpack']
      // },
      // {
      //   test: /\.ts/,
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   loader: 'tslint-loader',
      //   options: {
      //     configuration: tslintConfig
      //   }
      // },
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader', 
          'angular2-template-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|pdf|eot|woff2?|svg|ttf)$/,
        use: 'file-loader'
      },
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    // 指定html模板
    new HtmlWebpackPlugin({
      template: './examples/index.html',
      inject: 'body',
      xhtml: true,
      minify: true,
      hash: true,
    }),
    new MiniCssExtractPlugin({ 
      filename: '[name]-[hash].css', 
      chunkFilename: '[name]-[chunkhash].css' 
    }),
    // 解决警告问题
    new webpack.ContextReplacementPlugin(
      /@angular(\\|\/)core(\\|\/)fesm5/,
      utils.root('./'), {}
    ),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: conf.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
    // new AngularCompilerPlugin({
    //   tsConfigPath: path.resolve(__dirname, '../tsconfig.json'),
    //   entryModule: path.resolve(__dirname, '../examples/app/app.module#AppModule'),
    //   skipCodeGeneration: false
    // })
  ],
})

function createNotifierCallback () {
  const notifier = require('node-notifier')
  return (severity, errors) => {
    if (severity !== 'error') return
    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || conf.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: conf.dev.notifyOnErrors
        ? createNotifierCallback()
        : undefined
      }))
      resolve(devWebpackConfig)
    }
  })
})