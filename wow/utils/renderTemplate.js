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
var node_url_1 = require('node:url')
var deepMerge_1 = require('./deepMerge')
var sortDependencies_1 = require('./sortDependencies')
/**
 * Renders a template folder/file to the file system,
 * by recursively copying all files under the `src` directory,
 * with the following exception:
 *   - `_filename` should be renamed to `.filename`
 *   - Fields in `package.json` should be recursively merged
 * @param {string} src source filename to copy
 * @param {string} dest destination filename of the copy operation
 */
function renderTemplate(src, dest, callbacks) {
  var _this = this
  var stats = fs.statSync(src)
  if (stats.isDirectory()) {
    // skip node_module
    if (path.basename(src) === 'node_modules') {
      return
    }
    // if it's a directory, render its subdirectories and files recursively
    fs.mkdirSync(dest, { recursive: true })
    for (var _i = 0, _a = fs.readdirSync(src); _i < _a.length; _i++) {
      var file = _a[_i]
      renderTemplate(path.resolve(src, file), path.resolve(dest, file), callbacks)
    }
    return
  }
  var filename = path.basename(src)
  if (filename === 'package.json' && fs.existsSync(dest)) {
    // merge instead of overwriting
    var existing = JSON.parse(fs.readFileSync(dest, 'utf8'))
    var newPackage = JSON.parse(fs.readFileSync(src, 'utf8'))
    var pkg = (0, sortDependencies_1.default)((0, deepMerge_1.default)(existing, newPackage))
    fs.writeFileSync(dest, JSON.stringify(pkg, null, 2) + '\n')
    return
  }
  if (filename === 'extensions.json' && fs.existsSync(dest)) {
    // merge instead of overwriting
    var existing = JSON.parse(fs.readFileSync(dest, 'utf8'))
    var newExtensions = JSON.parse(fs.readFileSync(src, 'utf8'))
    var extensions = (0, deepMerge_1.default)(existing, newExtensions)
    fs.writeFileSync(dest, JSON.stringify(extensions, null, 2) + '\n')
    return
  }
  if (filename.startsWith('_')) {
    // rename `_file` to `.file`
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'))
  }
  if (filename === '_gitignore' && fs.existsSync(dest)) {
    // append to existing .gitignore
    var existing = fs.readFileSync(dest, 'utf8')
    var newGitignore = fs.readFileSync(src, 'utf8')
    fs.writeFileSync(dest, existing + '\n' + newGitignore)
    return
  }
  // data file for EJS templates
  if (filename.endsWith('.data.mjs')) {
    // use dest path as key for the data store
    dest = dest.replace(/\.data\.mjs$/, '')
    // Add a callback to the array for late usage when template files are being processed
    callbacks.push(function (dataStore) {
      return __awaiter(_this, void 0, void 0, function () {
        var getData, _a, _b
        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              return [
                4 /*yield*/,
                Promise.resolve(''.concat((0, node_url_1.pathToFileURL)(src).toString())).then(
                  function (s) {
                    return require(s)
                  }
                )
              ]
            case 1:
              getData = _c.sent().default
              // Though current `getData` are all sync, we still retain the possibility of async
              _a = dataStore
              _b = dest
              return [
                4 /*yield*/,
                getData({
                  oldData: dataStore[dest] || {}
                })
              ]
            case 2:
              // Though current `getData` are all sync, we still retain the possibility of async
              _a[_b] = _c.sent()
              return [2 /*return*/]
          }
        })
      })
    })
    return // skip copying the data file
  }
  fs.copyFileSync(src, dest)
}
exports.default = renderTemplate
//# sourceMappingURL=renderTemplate.js.map
