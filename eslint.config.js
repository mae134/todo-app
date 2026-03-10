import js from '@eslint/js' // JavaScript用のESLintルールセット
import globals from 'globals' // 「ブラウザにあるグローバル変数」をESLintに教える。
import reactHooks from 'eslint-plugin-react-hooks' // React Hooksのルールセット
import react from 'eslint-plugin-react' // ReactのJSXやコンポーネントに関するルール。
import tseslint from '@typescript-eslint/eslint-plugin' // TypeScript用のESLintルールセット
import tsParser from '@typescript-eslint/parser' // TypeScriptコードをESLintが理解できるようにするためのパーサー
import prettier from 'eslint-plugin-prettier' // PrettierとESLintを連携させるためのプラグイン
import prettierConfig from 'eslint-config-prettier' // Prettierと競合するESLintルールを無効化するための設定

export default [
  js.configs.recommended, // JavaScript用のESLintルールセット
  {
    files: ['**/*.{ts,tsx,js,mjs}'], // TypeScriptファイルに対してのルールを適用
    languageOptions: {
      parser: tsParser, // TypeScriptコードをESLintが理解できるようにするためのパーサー
      parserOptions: {
        ecmaVersion: 'latest', // 最新のECMAScript構文をサポート
        sourceType: 'module', // ESモジュールを使用
      },
      globals: {
        // ブラウザ環境のグローバル変数をESLintに教える
        ...globals.browser, // document / localStorage / fetch / console が解決されるようになる。
        ...globals.node, // process / __dirname / Buffer などNode.jsのグローバル変数も解決されるようになる。
        fetch: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint, // TypeScript用のESLintルールセット
      react, // ReactのJSXやコンポーネントに関するルール
      'react-hooks': reactHooks, // React Hooksのルールセット
      prettier, // PrettierとESLintを連携させるためのプラグイン
    },
    rules: {
      ...tseslint.configs.recommended.rules, // TypeScriptのおすすめルール一式。
      ...react.configs.recommended.rules, // ReactのJSXやコンポーネントに関するおすすめルール一式。
      ...reactHooks.configs.recommended.rules, // React Hooksのおすすめルール一式。

      'react/react-in-jsx-scope': 'off', // React18では不要
      'prettier/prettier': 'warn', // Prettierと連携
    },
    settings: {
      react: {
        version: 'detect', // Reactのバージョンを自動検出する設定
      },
    },
  },
  prettierConfig, // Prettierと競合するESLintルールを無効化するための設定
]
