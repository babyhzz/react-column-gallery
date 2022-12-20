const path = require('path');
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    files: ['*.ts', '*.tsx'],
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname
  },
  env: {
    browser: true,
    node: true
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'prettier', 'prettier/@typescript-eslint', 'prettier/react', 'plugin:storybook/recommended'],
  rules: {
    '@typescript-eslint/prefer-regexp-exec': 1,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/unbound-method': 1,
    '@typescript-eslint/explicit-function-return-type': 0
  }
};