const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  cache: true,
  entry: [
    // 'webpack-hot-middleware',
    './client/index.jsx'
  ],
  output: {
    path: path.join(__dirname, './client/dist/'),
    publicPath: '/client/index.js',
    filename: 'bundle.js'
  },
  externals: {
    Materialize: 'Materialize'
  },
  plugins: [
    new cleanWebpackPlugin(['client/dist']),
    new htmlWebpackPlugin({
      title: 'Hello-Books',
      template: 'client/index.html',
      inject: 'body'
    }),
    new webpack.EnvironmentPlugin([
      'FIREBASE_DOMAIN',
      'FIREBASE_MESSENGERID',
      'FIREBASE_APIKEY',
      'FIREBASE_URL',
      'GOOGLE_ID',
      'FIREBASE_PROJECTID',
      'FIREBASE_STORAGEBUCKET',
      'FIREBASE_STORAGEBUCKET',
      'secretKey',
    ]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    })
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              presets: ['es2015', 'react']
            }
          }
        ],
        include: path.join(__dirname, './client'),
        exclude: /node_modules/
      },
      {
        test: /(\.s?css)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff2(\?\S*)?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.woff(\?\S*)?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,

        loader: 'url-loader?limit=100000&mimetype=application/octet-stream'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?name=/assets/img/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 4
              },
              pngquant: {
                quality: '75-90',
                speed: 3
              }
            }
          }
        ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /materialize-css\/bin\//,
        loader: 'imports-loader?jQuery=jquery,$=jquery,hammerjs'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,

        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: { extensions: ['.js', '.jsx', '.css'] },
  node: {
    dns: 'empty',
    net: 'empty',
    fs: 'empty'
  }
};
