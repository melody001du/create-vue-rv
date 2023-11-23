#!/usr/bin/env node
'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var fs = require('node:fs')
var path = require('node:path')
// import minimist from 'minimist'
var minimist = require('minimist')
var prompts = require('prompts')
// import prompts from 'prompts'
var kolorist_1 = require('kolorist')
var ejs_1 = require('ejs')
var banners = require('./utils/banners')
var renderTemplate_1 = require('./utils/renderTemplate')
var directoryTraverse_1 = require('./utils/directoryTraverse')
var generateReadme_1 = require('./utils/generateReadme')
var getCommand_1 = require('./utils/getCommand')
var getLanguage_1 = require('./utils/getLanguage')
var renderEslint_1 = require('./utils/renderEslint')
var filterList_1 = require('./utils/filterList')
function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName)
}
function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}
function canSkipEmptying(dir) {
  if (!fs.existsSync(dir)) {
    return true
  }
  var files = fs.readdirSync(dir)
  if (files.length === 0) {
    return true
  }
  if (files.length === 1 && files[0] === '.git') {
    return true
  }
  return false
}
function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  ;(0, directoryTraverse_1.postOrderDirectoryTraverse)(
    dir,
    function (dir) {
      return fs.rmdirSync(dir)
    },
    function (file) {
      return fs.unlinkSync(file)
    }
  )
}
function init() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o
  return __awaiter(this, void 0, void 0, function () {
    var cwd,
      argv,
      isFeatureFlagsUsed,
      targetDir,
      defaultProjectName,
      forceOverwrite,
      language,
      result,
      cancelled_1,
      projectName,
      _p,
      packageName,
      _q,
      shouldOverwrite,
      _r,
      needsJsx,
      _s,
      needsTypeScript,
      _t,
      needsRouter,
      _u,
      needsPinia,
      _v,
      needsVitest,
      _w,
      needsEslint,
      _x,
      needsPrettier,
      needsE2eTesting,
      needsCypress,
      needsCypressCT,
      needsNightwatch,
      needsNightwatchCT,
      needsPlaywright,
      root,
      pkg,
      templateRoot,
      callbacks,
      render,
      codeTemplate,
      dataStore,
      _i,
      callbacks_1,
      cb,
      indexHtmlPath,
      indexHtmlContent,
      userAgent,
      packageManager,
      cdProjectName
    return __generator(this, function (_y) {
      switch (_y.label) {
        case 0:
          console.log()
          console.log(
            process.stdout.isTTY && process.stdout.getColorDepth() > 8
              ? banners.gradientBanner
              : banners.defaultBanner
          )
          console.log()
          cwd = process.cwd()
          argv = minimist(process.argv.slice(2), {
            alias: {
              typescript: ['ts'],
              'with-tests': ['tests'],
              router: ['vue-router']
            },
            string: ['_'],
            // all arguments are treated as booleans
            boolean: true
          })
          isFeatureFlagsUsed =
            typeof ((_k =
              (_j =
                (_h =
                  (_g =
                    (_f =
                      (_e =
                        (_d =
                          (_c =
                            (_b = (_a = argv.default) !== null && _a !== void 0 ? _a : argv.ts) !==
                              null && _b !== void 0
                              ? _b
                              : argv.jsx) !== null && _c !== void 0
                            ? _c
                            : argv.router) !== null && _d !== void 0
                          ? _d
                          : argv.pinia) !== null && _e !== void 0
                        ? _e
                        : argv.tests) !== null && _f !== void 0
                      ? _f
                      : argv.vitest) !== null && _g !== void 0
                    ? _g
                    : argv.cypress) !== null && _h !== void 0
                  ? _h
                  : argv.nightwatch) !== null && _j !== void 0
                ? _j
                : argv.playwright) !== null && _k !== void 0
              ? _k
              : argv.eslint) === 'boolean'
          targetDir = argv._[0]
          defaultProjectName = !targetDir ? 'vue-project' : targetDir
          forceOverwrite = argv.force
          language = (0, getLanguage_1.default)()
          result = {}
          _y.label = 1
        case 1:
          _y.trys.push([1, 3, , 4])
          return [
            4 /*yield*/,
            prompts(
              [
                {
                  name: 'projectName',
                  type: targetDir ? null : 'text',
                  message: language.projectName.message,
                  initial: defaultProjectName,
                  onState: function (state) {
                    return (targetDir = String(state.value).trim() || defaultProjectName)
                  }
                },
                {
                  name: 'shouldOverwrite',
                  type: function () {
                    return canSkipEmptying(targetDir) || forceOverwrite ? null : 'toggle'
                  },
                  message: function () {
                    var dirForPrompt =
                      targetDir === '.'
                        ? language.shouldOverwrite.dirForPrompts.current
                        : ''
                            .concat(language.shouldOverwrite.dirForPrompts.target, ' "')
                            .concat(targetDir, '"')
                    return ''.concat(dirForPrompt, ' ').concat(language.shouldOverwrite.message)
                  },
                  initial: true,
                  active: language.defaultToggleOptions.active,
                  inactive: language.defaultToggleOptions.inactive
                },
                {
                  name: 'overwriteChecker',
                  type: function (prev, values) {
                    if (values.shouldOverwrite === false) {
                      throw new Error(
                        (0, kolorist_1.red)('✖') + ' '.concat(language.errors.operationCancelled)
                      )
                    }
                    return null
                  }
                },
                {
                  name: 'packageName',
                  type: function () {
                    return isValidPackageName(targetDir) ? null : 'text'
                  },
                  message: language.packageName.message,
                  initial: function () {
                    return toValidPackageName(targetDir)
                  },
                  validate: function (dir) {
                    return isValidPackageName(dir) || language.packageName.invalidMessage
                  }
                },
                {
                  name: 'needsTypeScript',
                  type: function () {
                    return isFeatureFlagsUsed ? null : 'toggle'
                  },
                  message: language.needsTypeScript.message,
                  initial: false,
                  active: language.defaultToggleOptions.active,
                  inactive: language.defaultToggleOptions.inactive
                },
                {
                  name: 'needsJsx',
                  type: function () {
                    return isFeatureFlagsUsed ? null : 'toggle'
                  },
                  message: language.needsJsx.message,
                  initial: false,
                  active: language.defaultToggleOptions.active,
                  inactive: language.defaultToggleOptions.inactive
                },
                {
                  name: 'needsRouter',
                  type: function () {
                    return isFeatureFlagsUsed ? null : 'toggle'
                  },
                  message: language.needsRouter.message,
                  initial: false,
                  active: language.defaultToggleOptions.active,
                  inactive: language.defaultToggleOptions.inactive
                },
                {
                  name: 'needsPinia',
                  type: function () {
                    return isFeatureFlagsUsed ? null : 'toggle'
                  },
                  message: language.needsPinia.message,
                  initial: false,
                  active: language.defaultToggleOptions.active,
                  inactive: language.defaultToggleOptions.inactive
                },
                {
                  name: 'needsVitest',
                  type: function () {
                    return isFeatureFlagsUsed ? null : 'toggle'
                  },
                  message: language.needsVitest.message,
                  initial: false,
                  active: language.defaultToggleOptions.active,
                  inactive: language.defaultToggleOptions.inactive
                },
                {
                  name: 'needsE2eTesting',
                  type: function () {
                    return isFeatureFlagsUsed ? null : 'select'
                  },
                  hint: language.needsE2eTesting.hint,
                  message: language.needsE2eTesting.message,
                  initial: 0,
                  choices: function (prev, answers) {
                    return [
                      {
                        title: language.needsE2eTesting.selectOptions.negative.title,
                        value: false
                      },
                      {
                        title: language.needsE2eTesting.selectOptions.cypress.title,
                        description: answers.needsVitest
                          ? undefined
                          : language.needsE2eTesting.selectOptions.cypress.desc,
                        value: 'cypress'
                      },
                      {
                        title: language.needsE2eTesting.selectOptions.nightwatch.title,
                        description: answers.needsVitest
                          ? undefined
                          : language.needsE2eTesting.selectOptions.nightwatch.desc,
                        value: 'nightwatch'
                      },
                      {
                        title: language.needsE2eTesting.selectOptions.playwright.title,
                        value: 'playwright'
                      }
                    ]
                  }
                },
                {
                  name: 'needsEslint',
                  type: function () {
                    return isFeatureFlagsUsed ? null : 'toggle'
                  },
                  message: language.needsEslint.message,
                  initial: false,
                  active: language.defaultToggleOptions.active,
                  inactive: language.defaultToggleOptions.inactive
                },
                {
                  name: 'needsPrettier',
                  type: function (prev, values) {
                    if (isFeatureFlagsUsed || !values.needsEslint) {
                      return null
                    }
                    return 'toggle'
                  },
                  message: language.needsPrettier.message,
                  initial: false,
                  active: language.defaultToggleOptions.active,
                  inactive: language.defaultToggleOptions.inactive
                }
              ],
              {
                onCancel: function () {
                  throw new Error(
                    (0, kolorist_1.red)('✖') + ' '.concat(language.errors.operationCancelled)
                  )
                }
              }
            )
          ]
        case 2:
          // Prompts:
          // - Project name:
          //   - whether to overwrite the existing directory or not?
          //   - enter a valid package name for package.json
          // - Project language: JavaScript / TypeScript
          // - Add JSX Support?
          // - Install Vue Router for SPA development?
          // - Install Pinia for state management?
          // - Add Cypress for testing?
          // - Add Nightwatch for testing?
          // - Add Playwright for end-to-end testing?
          // - Add ESLint for code quality?
          // - Add Prettier for code formatting?
          result = _y.sent()
          return [3 /*break*/, 4]
        case 3:
          cancelled_1 = _y.sent()
          console.log(cancelled_1.message)
          process.exit(1)
          return [3 /*break*/, 4]
        case 4:
          ;(projectName = result.projectName),
            (_p = result.packageName),
            (packageName =
              _p === void 0
                ? projectName !== null && projectName !== void 0
                  ? projectName
                  : defaultProjectName
                : _p),
            (_q = result.shouldOverwrite),
            (shouldOverwrite = _q === void 0 ? argv.force : _q),
            (_r = result.needsJsx),
            (needsJsx = _r === void 0 ? argv.jsx : _r),
            (_s = result.needsTypeScript),
            (needsTypeScript = _s === void 0 ? argv.typescript : _s),
            (_t = result.needsRouter),
            (needsRouter = _t === void 0 ? argv.router : _t),
            (_u = result.needsPinia),
            (needsPinia = _u === void 0 ? argv.pinia : _u),
            (_v = result.needsVitest),
            (needsVitest = _v === void 0 ? argv.vitest || argv.tests : _v),
            (_w = result.needsEslint),
            (needsEslint = _w === void 0 ? argv.eslint || argv['eslint-with-prettier'] : _w),
            (_x = result.needsPrettier),
            (needsPrettier = _x === void 0 ? argv['eslint-with-prettier'] : _x)
          needsE2eTesting = result.needsE2eTesting
          needsCypress = argv.cypress || argv.tests || needsE2eTesting === 'cypress'
          needsCypressCT = needsCypress && !needsVitest
          needsNightwatch = argv.nightwatch || needsE2eTesting === 'nightwatch'
          needsNightwatchCT = needsNightwatch && !needsVitest
          needsPlaywright = argv.playwright || needsE2eTesting === 'playwright'
          root = path.join(cwd, targetDir)
          if (fs.existsSync(root) && shouldOverwrite) {
            emptyDir(root)
          } else if (!fs.existsSync(root)) {
            fs.mkdirSync(root)
          }
          console.log('\n'.concat(language.infos.scaffolding, ' ').concat(root, '...'))
          pkg = { name: packageName, version: '0.0.0' }
          fs.writeFileSync(path.resolve(root, 'package.json'), JSON.stringify(pkg, null, 2))
          templateRoot = path.resolve(__dirname, 'template')
          callbacks = []
          render = function render(templateName) {
            var templateDir = path.resolve(templateRoot, templateName)
            ;(0, renderTemplate_1.default)(templateDir, root, callbacks)
          }
          // Render base template
          render('base')
          // Add configs.
          if (needsJsx) {
            render('config/jsx')
          }
          if (needsRouter) {
            render('config/router')
          }
          if (needsPinia) {
            render('config/pinia')
          }
          if (needsVitest) {
            render('config/vitest')
          }
          if (needsCypress) {
            render('config/cypress')
          }
          if (needsCypressCT) {
            render('config/cypress-ct')
          }
          if (needsNightwatch) {
            render('config/nightwatch')
          }
          if (needsNightwatchCT) {
            render('config/nightwatch-ct')
          }
          if (needsPlaywright) {
            render('config/playwright')
          }
          if (needsTypeScript) {
            render('config/typescript')
            // Render tsconfigs
            render('tsconfig/base')
            if (needsCypress) {
              render('tsconfig/cypress')
            }
            if (needsCypressCT) {
              render('tsconfig/cypress-ct')
            }
            if (needsPlaywright) {
              render('tsconfig/playwright')
            }
            if (needsVitest) {
              render('tsconfig/vitest')
            }
            if (needsNightwatch) {
              render('tsconfig/nightwatch')
            }
            if (needsNightwatchCT) {
              render('tsconfig/nightwatch-ct')
            }
          }
          // Render ESLint config
          if (needsEslint) {
            ;(0, renderEslint_1.default)(root, {
              needsTypeScript: needsTypeScript,
              needsCypress: needsCypress,
              needsCypressCT: needsCypressCT,
              needsPrettier: needsPrettier
            })
          }
          codeTemplate =
            (needsTypeScript ? 'typescript-' : '') + (needsRouter ? 'router' : 'default')
          render('code/'.concat(codeTemplate))
          // Render entry file (main.js/ts).
          if (needsPinia && needsRouter) {
            render('entry/router-and-pinia')
          } else if (needsPinia) {
            render('entry/pinia')
          } else if (needsRouter) {
            render('entry/router')
          } else {
            render('entry/default')
          }
          dataStore = {}
          ;(_i = 0), (callbacks_1 = callbacks)
          _y.label = 5
        case 5:
          if (!(_i < callbacks_1.length)) return [3 /*break*/, 8]
          cb = callbacks_1[_i]
          return [4 /*yield*/, cb(dataStore)]
        case 6:
          _y.sent()
          _y.label = 7
        case 7:
          _i++
          return [3 /*break*/, 5]
        case 8:
          // EJS template rendering
          ;(0, directoryTraverse_1.preOrderDirectoryTraverse)(
            root,
            function () {},
            function (filepath) {
              if (filepath.endsWith('.ejs')) {
                var template = fs.readFileSync(filepath, 'utf-8')
                var dest = filepath.replace(/\.ejs$/, '')
                var content = ejs_1.default.render(template, dataStore[dest])
                fs.writeFileSync(dest, content)
                fs.unlinkSync(filepath)
              }
            }
          )
          // Cleanup.
          // We try to share as many files between TypeScript and JavaScript as possible.
          // If that's not possible, we put `.ts` version alongside the `.js` one in the templates.
          // So after all the templates are rendered, we need to clean up the redundant files.
          // (Currently it's only `cypress/plugin/index.ts`, but we might add more in the future.)
          // (Or, we might completely get rid of the plugins folder as Cypress 10 supports `cypress.config.ts`)
          if (needsTypeScript) {
            // Convert the JavaScript template to the TypeScript
            // Check all the remaining `.js` files:
            //   - If the corresponding TypeScript version already exists, remove the `.js` version.
            //   - Otherwise, rename the `.js` file to `.ts`
            // Remove `jsconfig.json`, because we already have tsconfig.json
            // `jsconfig.json` is not reused, because we use solution-style `tsconfig`s, which are much more complicated.
            ;(0, directoryTraverse_1.preOrderDirectoryTraverse)(
              root,
              function () {},
              function (filepath) {
                if (
                  filepath.endsWith('.js') &&
                  !filterList_1.FILES_TO_FILTER.includes(path.basename(filepath))
                ) {
                  var tsFilePath = filepath.replace(/\.js$/, '.ts')
                  if (fs.existsSync(tsFilePath)) {
                    fs.unlinkSync(filepath)
                  } else {
                    fs.renameSync(filepath, tsFilePath)
                  }
                } else if (path.basename(filepath) === 'jsconfig.json') {
                  fs.unlinkSync(filepath)
                }
              }
            )
            indexHtmlPath = path.resolve(root, 'index.html')
            indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8')
            fs.writeFileSync(indexHtmlPath, indexHtmlContent.replace('src/main.js', 'src/main.ts'))
          } else {
            // Remove all the remaining `.ts` files
            ;(0, directoryTraverse_1.preOrderDirectoryTraverse)(
              root,
              function () {},
              function (filepath) {
                if (filepath.endsWith('.ts')) {
                  fs.unlinkSync(filepath)
                }
              }
            )
          }
          userAgent = (_l = process.env.npm_config_user_agent) !== null && _l !== void 0 ? _l : ''
          packageManager = /pnpm/.test(userAgent) ? 'pnpm' : /yarn/.test(userAgent) ? 'yarn' : 'npm'
          // README generation
          fs.writeFileSync(
            path.resolve(root, 'README.md'),
            (0, generateReadme_1.default)({
              projectName:
                (_o =
                  (_m = result.projectName) !== null && _m !== void 0 ? _m : result.packageName) !==
                  null && _o !== void 0
                  ? _o
                  : defaultProjectName,
              packageManager: packageManager,
              needsTypeScript: needsTypeScript,
              needsVitest: needsVitest,
              needsCypress: needsCypress,
              needsNightwatch: needsNightwatch,
              needsPlaywright: needsPlaywright,
              needsNightwatchCT: needsNightwatchCT,
              needsCypressCT: needsCypressCT,
              needsEslint: needsEslint
            })
          )
          console.log('\n'.concat(language.infos.done, '\n'))
          if (root !== cwd) {
            cdProjectName = path.relative(cwd, root)
            console.log(
              '  '.concat(
                (0, kolorist_1.bold)(
                  (0, kolorist_1.green)(
                    'cd '.concat(
                      cdProjectName.includes(' ') ? '"'.concat(cdProjectName, '"') : cdProjectName
                    )
                  )
                )
              )
            )
          }
          console.log(
            '  '.concat(
              (0, kolorist_1.bold)(
                (0, kolorist_1.green)((0, getCommand_1.default)(packageManager, 'install'))
              )
            )
          )
          if (needsPrettier) {
            console.log(
              '  '.concat(
                (0, kolorist_1.bold)(
                  (0, kolorist_1.green)((0, getCommand_1.default)(packageManager, 'format'))
                )
              )
            )
          }
          console.log(
            '  '.concat(
              (0, kolorist_1.bold)(
                (0, kolorist_1.green)((0, getCommand_1.default)(packageManager, 'dev'))
              )
            )
          )
          console.log()
          return [2 /*return*/]
      }
    })
  })
}
init().catch(function (e) {
  console.error(e)
})
//# sourceMappingURL=index.js.map
