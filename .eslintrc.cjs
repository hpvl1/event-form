module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    // "standard",
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    // 'react-refresh/only-export-components': [
    //   'warn',
    //   { allowConstantExport: true },
    // ],
    'indent': ['error', 2],
    'no-trailing-spaces': 'error',
    'no-multi-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'semi': [2, 'always'],
    'no-extra-semi': 'error',
    'semi-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'space-before-function-paren': ['error', 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quotes': [2, 'single', {
      'avoidEscape': true
    }],
  }
}
