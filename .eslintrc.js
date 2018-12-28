module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'global-require': 0,
    'prettier/prettier': ['error'],
    'react/jsx-one-expression-per-line': [true, { allow: 'literal' }],
  },
};
