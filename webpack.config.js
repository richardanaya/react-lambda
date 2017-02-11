const path = require('path');
const webpack = require('webpack');
module.exports = {
  target: "node",
  context: path.resolve(__dirname),
  entry: {
    app: './app.js',
  },
  output: {
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }],
      }

      // Loaders for other file types can go here
    ]
  }
};
