'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var fs = require('node:fs')
var path = require('node:path')
function getLocale() {
  var shellLocale =
    Intl.DateTimeFormat().resolvedOptions().locale || // Built-in ECMA-402 support
    process.env.LC_ALL || // POSIX locale environment variables
    process.env.LC_MESSAGES ||
    process.env.LANG ||
    // TODO: Windows support if needed, could consider https://www.npmjs.com/package/os-locale
    'en-US' // Default fallback
  var locale = shellLocale.split('.')[0].replace('_', '-')
  return locale
}
function getLanguage() {
  var locale = getLocale()
  // Note here __dirname would not be transpiled,
  // so it refers to the __dirname of the file `<repositoryRoot>/outfile.cjs`
  // TODO: use glob import once https://github.com/evanw/esbuild/issues/3320 is fixed
  var localesRoot = path.resolve(__dirname, 'locales')
  var languageFilePath = path.resolve(localesRoot, ''.concat(locale, '.json'))
  var doesLanguageExist = fs.existsSync(languageFilePath)
  if (!doesLanguageExist) {
    console.warn(
      '\u001B[33mThe locale langage "'.concat(
        locale,
        '" is not supported, fallback to "en-US".\n\u001B[39m'
      )
    )
  }
  var lang = doesLanguageExist
    ? require(languageFilePath)
    : require(path.resolve(localesRoot, 'en-US.json'))
  return lang
}
exports.default = getLanguage
//# sourceMappingURL=getLanguage.js.map
