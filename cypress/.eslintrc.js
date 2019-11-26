module.exports = {
  extends: [
    "plugin:cypress/recommended"
  ],
  plugins: [
    'cypress'
  ],
  env: {
    mocha: true,
    node: true,
    'cypress/globals': true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  }
}
