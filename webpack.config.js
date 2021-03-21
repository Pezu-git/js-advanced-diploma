const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    chunkLoading: false,
    wasmLoading: false,
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
  ],
};
