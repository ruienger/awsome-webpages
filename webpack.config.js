const path = require('path')

module.exports = {
  entry: path.resolve('src/index.html'),
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  mode: 'development'
}