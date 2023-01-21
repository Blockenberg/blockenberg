module.exports = {
  arrowParens: 'avoid',
  htmlWhitespaceSensitivity: 'ignore',
  semi: false,
  singleQuote: true,
  svelteBracketNewLine: true,
  svelteSortOrder: 'options-scripts-markup-styles',
  svelteStrictMode: false,
  svelteIndentScriptAndStyle: true,
  tabWidth: 2,
  trailingComma: 'semicolon',
  overrides: [
    {
      files: '*.md',
      options: {
        tabWidth: 4,
      }
    }
  ]
}