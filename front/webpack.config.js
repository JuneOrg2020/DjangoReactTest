const path = require('path');

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    './App': ['./src/index.js'],
  },
  output: {
    path: path.join(__dirname, '../top/static/'),
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '192.168.11.7',
    port: 8080,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [],
};
