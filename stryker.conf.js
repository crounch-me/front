// This config was generated using a preset.
// Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/vuejs.md#vuejs
module.exports = function (config) {
  config.set({
    mutate: [
      'src/**/*.ts',
      '!src/**/*.spec.ts',
      '!src/registerServiceWorker.ts',
      '!src/main.ts',
      '!src/store/index.ts',
      '!src/utils/constants.ts',
      '!src/router/router.ts',
      '!src/utils/test.ts',
      '!src/**/*.stories.ts'
    ],
    mutator: 'vue',
    testRunner: 'jest',
    jest: {
      config: require('./jest.config'),
    },
    reporters: ['progress', 'clear-text'],
    coverageAnalysis: 'off',
    thresholds: {
      break: 95,
      high: 99,
      low: 97,
    },
  });
};
