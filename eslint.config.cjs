// // module.exports = {
// //   parser: '@typescript-eslint/parser',
// //   parserOptions: {
// //     project: 'tsconfig.json',
// //     tsconfigRootDir: __dirname,
// //     sourceType: 'module',
// //   },
// //   plugins: ['@typescript-eslint/eslint-plugin'],
// //   extends: [
// //     'plugin:@typescript-eslint/recommended',
// //     'plugin:prettier/recommended',
// //   ],
// //   root: true,
// //   env: {
// //     node: true,
// //     jest: true,
// //   },
// //   ignorePatterns: ['.eslintrc.js'],
// //   rules: {
// //     '@typescript-eslint/interface-name-prefix': 'off',
// //     '@typescript-eslint/explicit-function-return-type': 'off',
// //     '@typescript-eslint/explicit-module-boundary-types': 'off',
// //     '@typescript-eslint/no-explicit-any': 'off',
// //   },
// // };

// import js from '@eslint/js';
// import tsParser from '@typescript-eslint/parser';
// import tsPlugin from '@typescript-eslint/eslint-plugin';

// export default [
//   js.configs.recommended, // ESLint recommended rules
//   {
//     files: ['**/*.ts', '**/*.tsx'],
//     languageOptions: {
//       parser: tsParser,
//       parserOptions: {
//         project: './tsconfig.json',
//         tsconfigRootDir: process.cwd(),
//         sourceType: 'module',
//       },
//       globals: {
//         // Puedes agregar globals aquí si necesitas
//       },
//     },
//     plugins: {
//       '@typescript-eslint': tsPlugin,
//     },
//     rules: {
//       '@typescript-eslint/interface-name-prefix': 'off',
//       '@typescript-eslint/explicit-function-return-type': 'off',
//       '@typescript-eslint/explicit-module-boundary-types': 'off',
//       '@typescript-eslint/no-explicit-any': 'off',
//     },
//   },
//   {
//     ignores: ['node_modules/**', 'dist/**', '.eslintrc.js'],
//   },
// ];

// import js from '@eslint/js';
// import tsParser from '@typescript-eslint/parser';
// import tsPlugin from '@typescript-eslint/eslint-plugin';
// import prettierPlugin from 'eslint-plugin-prettier';

// export default [
//   js.configs.recommended,
//   {
//     files: ['**/*.ts', '**/*.tsx'],
//     languageOptions: {
//       parser: tsParser,
//       parserOptions: {
//         project: './tsconfig.json',
//         tsconfigRootDir: process.cwd(),
//         sourceType: 'module',
//       },
//     },
//     plugins: {
//       '@typescript-eslint': tsPlugin,
//       prettier: prettierPlugin,
//     },
//     rules: {
//       // TypeScript rules
//       '@typescript-eslint/interface-name-prefix': 'off',
//       '@typescript-eslint/explicit-function-return-type': 'off',
//       '@typescript-eslint/explicit-module-boundary-types': 'off',
//       '@typescript-eslint/no-explicit-any': 'off',
//       // Prettier integration
//       'prettier/prettier': 'warn',
//     },
//   },
//   {
//     ignores: ['node_modules/**', 'dist/**', '.eslintrc.js', 'coverage/**', '*.config.js', '*.config.cjs'],
//   },
// ];

// eslint.config.cjs
const js = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // Prettier integration
      'prettier/prettier': 'warn',
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', '.eslintrc.js'],
  },
];
