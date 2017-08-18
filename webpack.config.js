const path = require('path');

module.exports = {
  entry: './client/',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, '/client'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'client/dist/'),
    publicPath: '/client/',
    filename: 'bundle.js'
  }
};
