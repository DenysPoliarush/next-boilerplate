// TODO TBD linter
module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  plugins: ['@typescript-eslint'],

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  ignorePatterns: ['dts/*.d.ts'],

  rules: {
    'max-len': ['error', {
      code: 120,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreRegExpLiterals: true
    }],
    'no-undef': 'off',
    'no-prototype-builtins': 'off',
    'array-callback-return': 'off',
    'func-call-spacing': 'off',
    'react/jsx-no-undef': 'off',
    indent: 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/func-call-spacing': ['error', 'never'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error',
      {
        ignoreRestSiblings: true,
        args: 'all',
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/indent': ['error', 2, { VariableDeclarator: 4 }],
    '@typescript-eslint/type-annotation-spacing': ['error', {
      before: false,
      after: true,
      overrides: { arrow: { before: true, after: true } }
    }],

    '@typescript-eslint/member-delimiter-style': ['error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I']
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        prefix: ['T']
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        prefix: ['E']
      }
    ]
  }
}
