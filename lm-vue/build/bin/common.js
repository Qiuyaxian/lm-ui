const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./config');

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: 'lm-ui.common.js',
    chunkFilename: '[id].js',
    libraryExport: 'default',
    library: 'ELEMENT',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  externals: config.externals,
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: config.jsexclude,
        include: process.cwd(),
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
        // options: { 
        //   loaders: { 
        //      css: [MiniCssExtractPlugin.loader, 'vue-style-loader',  'css-loader'],  
        //      sass: [MiniCssExtractPlugin.loader, 'vue-style-loader',  'css-loader', 'sass-loader'],
        //      scss: [MiniCssExtractPlugin.loader, 'vue-style-loader',  'css-loader', 'sass-loader']        
        //   },
        //   cssSourceMap: false,
        //   cacheBusting: true,
        //   transformToRequire: { 
        //     video: [ 'src', 'poster' ],
        //     source: 'src',
        //     img: 'src',
        //     image: 'xlink:href' 
        //   } 
        // }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // {
      //   test: /\.scss$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      //   // include: process.cwd(),
      //   // exclude: [path.resolve(__dirname, './examples'), path.resolve(__dirname, './src')]
      // },
      // {
      //   test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 10000,
      //     name: path.posix.join('static', '[name].[hash:7].[ext]')
      //   }
      // }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
  ]
};