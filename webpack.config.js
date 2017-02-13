const path = require('path');

module.exports = [{
  target: 'node',
  context: path.resolve(__dirname),
  entry: {
    app: './server.js',
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
}, {
  context: path.resolve(__dirname),
  entry: {
    app: './client.js',
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
       { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react'] },
        }],
      },
    ],
  },
}];
