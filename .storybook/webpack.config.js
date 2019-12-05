// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = async ({ config }) => {
  config.resolve.extensions.push('.ts', '.vue')

  config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        },
      }
    ],
  });

  return config;
}
