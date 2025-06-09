module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['react-app'],
  plugins: ['jsx-a11y', 'simple-import-sort'],
  ignorePatterns: ['service-worker.ts', 'serviceWorkerRegistration.ts', '**/*.d.ts'],
  globals: {
    React: true,
    google: true,
    mount: true,
    mountWithRouter: true,
    shallow: true,
    shallowWithRouter: true,
    context: true,
    expect: true,
    jsdom: true,
    JSX: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/no-named-as-default': 'off',
    'no-shadow': 'off',
    'no-plusplus': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-cycle': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-anonymous-default-export': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            '^(assert|buffer|child_process|cluster|console|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@|@store|@resources|@components|@ui|@constants|@helpers|@hooks|@lib|vendored-lib)(/.*|$)'],
          ['^(@|store|resources|components|ui|constants|helpers|hooks|lib|vendored-lib)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          // eslint-disable-next-line quotes
          ['^\\.\\.(?!/?$)", "^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'no-use-before-define': 'off',
    semi: 2,
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-array-index-key': ['warn'],
    'no-param-reassign': ['error', { props: true }],
    // typescript
    '@typescript-eslint/indent': ['off'],
    '@typescript-eslint/type-annotation-spacing': ['warn', { after: true }],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/explicit-member-accessibility': ['error', { overrides: { constructors: 'off' } }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        custom: {
          regex: '^T[A-Z]',
          match: true,
        },
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        custom: {
          regex: '[A-z]+[Enum]',
          match: true,
        },
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [],
        classes: [],
        interfaces: ['field', 'constructor', 'method'],
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',

    // custom ovverides
    indent: 'off',
    'linebreak-style': ['error', 'unix'],
    'no-undef': 'off',
    quotes: ['error', 'double'],
    'max-len': 'off',
    camelcase: 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': 'off',
  },
};
