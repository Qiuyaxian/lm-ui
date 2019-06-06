const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const Components = require('../../components.json');
const config = require('./config');
function resolve (dir) {
  return path.join(process.cwd(), dir)
}
const webpackConfig = {
  mode: 'production',
  entry: Components,
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
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
  stats: 'none',
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: config.jsexclude,
        include: [resolve('examples'), resolve('typings'), resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false
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
      // 添加ts文件解析规则 start
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      }
      // 添加ts文件解析规则 end
      // {
      //   test: /\.scss$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
    // new VueLoaderPlugin()
  ]
};

module.exports = webpackConfig;