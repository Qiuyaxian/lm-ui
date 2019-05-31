const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');
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
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'ELEMENT',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias
  },
  externals: {
    vue: config.vue
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
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
      // }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
  ]
};