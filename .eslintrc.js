module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    'no-console': 'on',
    'no-debugger': 'on',
    'vue/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        args: 'all'
      }
    ],
    'vue/max-attributes-per-line': [
      'warning',
      {
        singleline: {
          max: 1,
          allowFirstLine: true
        },
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/no-unused-components': 'error'
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
