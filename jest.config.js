module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['**/*.spec.ts'],
  globals: {
    'ts-jest': {
      tsConfig: 'src/tsconfig.json'
    }
  }
};
