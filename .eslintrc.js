module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  //   extends: ['plugin:react/recommended'],
  parser: '@typescript-eslint/parser', // if not installed, many feature in ts could not be indentified
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'typescript-eslint/no-explict-any': 'off',
    'prefer-const': 'error',
  },
};
