const wp = require('@cypress/webpack-preprocessor')

const webpackOptions = require('../webpack.config');

const options = {
  webpackOptions
}

module.exports = wp(options)
