import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  { ignores: ['lib', 'validators'] },
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    },

    rules: {
      'no-useless-escape': 0,
      'no-case-declarations': 0,
      'prefer-const': 2,
      'no-unused-vars': 0,
      'no-unused-expressions': 0,
      'no-constant-condition': [
        2,
        {
          checkLoops: false
        }
      ],

      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-this-alias': 0,
      '@typescript-eslint/no-unused-expressions': 0
    }
  }
]
