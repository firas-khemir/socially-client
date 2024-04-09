module.exports = {
  root: true,
  extends: '@react-native',

  rules: {
    'no-mixed-spaces-and-tabs': 'off',
    'linebreak-style': 0,
    'react/prop-types': 'off',
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-type': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unus-any': ['off'],
    '@typescript-eslint/no-unused-vars': 'warn',
    // 'max-len': [2, 120, 4],
    // 'max-statements': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ]
  }
};
