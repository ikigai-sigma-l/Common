import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked
  ],
  files: ['**/*.{ts,tsx}'],
  ignores: ['node_modules/', 'dist/', 'build/', 'src/pixi/**', 'src/fakeserver/**'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.json'],
      tsconfigRootDir: import.meta.dirname,
    }
  },
  settings: { react: { version: '18.3' } },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    react,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    "@typescript-eslint/consistent-type-definitions": "off",
    "react/display-name": "off",
  }
});