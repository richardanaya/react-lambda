const path = require('path');

module.exports = {
  target: 'node',
  context: path.resolve(__dirname),
  entry: {
    app: './app.js',
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react'] },
        }],
      },
    ],
  },
};
