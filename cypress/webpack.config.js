module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
}
