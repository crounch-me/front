module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/html-closing-bracket-spacing': ['error', {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'never'
    }]
  }
}
