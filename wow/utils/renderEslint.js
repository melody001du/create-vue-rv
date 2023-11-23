'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var fs = require('node:fs')
var path = require('node:path')
var create_eslint_config_1 = require('@vue/create-eslint-config')
var sortDependencies_1 = require('./sortDependencies')
var deepMerge_1 = require('./deepMerge')
var package_json_1 = require('../template/eslint/package.json')
var eslintDeps = package_json_1.default.devDependencies
function renderEslint(rootDir, _a) {
  var needsTypeScript = _a.needsTypeScript,
    needsCypress = _a.needsCypress,
    needsCypressCT = _a.needsCypressCT,
    needsPrettier = _a.needsPrettier
  var additionalConfig = {}
  var additionalDependencies = {}
  if (needsCypress) {
    additionalConfig.overrides = [
      {
        files: needsCypressCT
          ? [
              '**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
              'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'
            ]
          : ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
        extends: ['plugin:cypress/recommended']
      }
    ]
    additionalDependencies['eslint-plugin-cypress'] = eslintDeps['eslint-plugin-cypress']
  }
  var _b = (0, create_eslint_config_1.default)({
      vueVersion: '3.x',
      // we currently don't support other style guides
      styleGuide: 'default',
      hasTypeScript: needsTypeScript,
      needsPrettier: needsPrettier,
      additionalConfig: additionalConfig,
      additionalDependencies: additionalDependencies
    }),
    pkg = _b.pkg,
    files = _b.files
  var scripts = {
    // Note that we reuse .gitignore here to avoid duplicating the configuration
    lint: needsTypeScript
      ? 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore'
      : 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore'
  }
  // Theoretically, we could add Prettier without requring ESLint.
  // But it doesn't seem to be a good practice, so we just leave it here.
  if (needsPrettier) {
    // Default to only format the `src/` directory to avoid too much noise, and
    // the need for a `.prettierignore` file.
    // Users can still append any paths they'd like to format to the command,
    // e.g. `npm run format cypress/`.
    scripts.format = 'prettier --write src/'
  }
  // update package.json
  var packageJsonPath = path.resolve(rootDir, 'package.json')
  var existingPkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  var updatedPkg = (0, sortDependencies_1.default)(
    (0, deepMerge_1.default)((0, deepMerge_1.default)(existingPkg, pkg), { scripts: scripts })
  )
  fs.writeFileSync(packageJsonPath, JSON.stringify(updatedPkg, null, 2) + '\n', 'utf-8')
  // write to .eslintrc.cjs, .prettierrc.json, etc.
  for (var _i = 0, _c = Object.entries(files); _i < _c.length; _i++) {
    var _d = _c[_i],
      fileName = _d[0],
      content = _d[1]
    var fullPath = path.resolve(rootDir, fileName)
    fs.writeFileSync(fullPath, content, 'utf-8')
  }
  // update .vscode/extensions.json
  var extensionsJsonPath = path.resolve(rootDir, '.vscode/extensions.json')
  var existingExtensions = JSON.parse(fs.readFileSync(extensionsJsonPath, 'utf8'))
  existingExtensions.recommendations.push('dbaeumer.vscode-eslint')
  if (needsPrettier) {
    existingExtensions.recommendations.push('esbenp.prettier-vscode')
  }
  fs.writeFileSync(extensionsJsonPath, JSON.stringify(existingExtensions, null, 2) + '\n', 'utf-8')
}
exports.default = renderEslint
//# sourceMappingURL=renderEslint.js.map
