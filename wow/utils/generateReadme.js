'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var getCommand_1 = require('./getCommand')
var sfcTypeSupportDoc = [
  '',
  '## Type Support for `.vue` Imports in TS',
  '',
  'TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.',
  '',
  "If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:",
  '',
  '1. Disable the built-in TypeScript Extension',
  "    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette",
  '    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`',
  '2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.',
  ''
].join('\n')
function generateReadme(_a) {
  var projectName = _a.projectName,
    packageManager = _a.packageManager,
    needsTypeScript = _a.needsTypeScript,
    needsCypress = _a.needsCypress,
    needsNightwatch = _a.needsNightwatch,
    needsCypressCT = _a.needsCypressCT,
    needsNightwatchCT = _a.needsNightwatchCT,
    needsPlaywright = _a.needsPlaywright,
    needsVitest = _a.needsVitest,
    needsEslint = _a.needsEslint
  var commandFor = function (scriptName, args) {
    return (0, getCommand_1.default)(packageManager, scriptName, args)
  }
  var readme = '# '
    .concat(
      projectName,
      '\n\nThis template should help get you started developing with Vue 3 in Vite.\n\n## Recommended IDE Setup\n\n[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).\n'
    )
    .concat(
      needsTypeScript ? sfcTypeSupportDoc : '',
      '\n## Customize configuration\n\nSee [Vite Configuration Reference](https://vitejs.dev/config/).\n\n## Project Setup\n\n'
    )
  var npmScriptsDescriptions = '```sh\n'
    .concat(commandFor('install'), '\n```\n\n### Compile and Hot-Reload for Development\n\n```sh\n')
    .concat(commandFor('dev'), '\n```\n\n### ')
    .concat(needsTypeScript ? 'Type-Check, ' : '', 'Compile and Minify for Production\n\n```sh\n')
    .concat(commandFor('build'), '\n```\n')
  if (needsVitest) {
    npmScriptsDescriptions +=
      '\n### Run Unit Tests with [Vitest](https://vitest.dev/)\n\n```sh\n'.concat(
        commandFor('test:unit'),
        '\n```\n'
      )
  }
  if (needsCypressCT) {
    npmScriptsDescriptions +=
      '\n### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)\n\n```sh\n'
        .concat(commandFor('test:unit:dev'), ' # or `')
        .concat(commandFor('test:unit'), '` for headless testing\n```\n')
  }
  if (needsCypress) {
    npmScriptsDescriptions +=
      '\n### Run End-to-End Tests with [Cypress](https://www.cypress.io/)\n\n```sh\n'
        .concat(
          commandFor('test:e2e:dev'),
          "\n```\n\nThis runs the end-to-end tests against the Vite development server.\nIt is much faster than the production build.\n\nBut it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):\n\n```sh\n"
        )
        .concat(commandFor('build'), '\n')
        .concat(commandFor('test:e2e'), '\n```\n')
  }
  if (needsNightwatch) {
    npmScriptsDescriptions +=
      '\n### Run End-to-End Tests with [Nightwatch](https://nightwatchjs.org/)\n\n```sh\n# When using CI, the project must be built first.\n'
        .concat(commandFor('build'), '\n\n# Runs the end-to-end tests\n')
        .concat(commandFor('test:e2e'), '\n# Runs the tests only on Chrome\n')
        .concat(commandFor('test:e2e', '--env chrome'), '\n# Runs the tests of a specific file\n')
        .concat(
          commandFor('test:e2e', 'tests/e2e/example.'.concat(needsTypeScript ? 'ts' : 'js')),
          '\n# Runs the tests in debug mode\n'
        )
        .concat(commandFor('test:e2e', '--debug'), '\n```\n    ')
  }
  if (needsNightwatch) {
    npmScriptsDescriptions +=
      '\n### Run Headed Component Tests with [Nightwatch Component Testing](https://nightwatchjs.org/guide/component-testing/introduction.html)\n  \n```sh\n'
        .concat(commandFor('test:unit'), '\n')
        .concat(commandFor('test:unit -- --headless # for headless testing'), '\n```\n')
  }
  if (needsPlaywright) {
    npmScriptsDescriptions +=
      '\n### Run End-to-End Tests with [Playwright](https://playwright.dev)\n\n```sh\n# Install browsers for the first run\nnpx playwright install\n\n# When testing on CI, must build the project first\n'
        .concat(commandFor('build'), '\n\n# Runs the end-to-end tests\n')
        .concat(commandFor('test:e2e'), '\n# Runs the tests only on Chromium\n')
        .concat(
          commandFor('test:e2e', '--project=chromium'),
          '\n# Runs the tests of a specific file\n'
        )
        .concat(
          commandFor('test:e2e', 'tests/example.spec.ts'),
          '\n# Runs the tests in debug mode\n'
        )
        .concat(commandFor('test:e2e', '--debug'), '\n```\n')
  }
  if (needsEslint) {
    npmScriptsDescriptions += '\n### Lint with [ESLint](https://eslint.org/)\n\n```sh\n'.concat(
      commandFor('lint'),
      '\n```\n'
    )
  }
  readme += npmScriptsDescriptions
  return readme
}
exports.default = generateReadme
//# sourceMappingURL=generateReadme.js.map
