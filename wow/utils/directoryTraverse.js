'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.postOrderDirectoryTraverse = exports.preOrderDirectoryTraverse = void 0
var fs = require('node:fs')
var path = require('node:path')
function preOrderDirectoryTraverse(dir, dirCallback, fileCallback) {
  for (var _i = 0, _a = fs.readdirSync(dir); _i < _a.length; _i++) {
    var filename = _a[_i]
    if (filename === '.git') {
      continue
    }
    var fullpath = path.resolve(dir, filename)
    if (fs.lstatSync(fullpath).isDirectory()) {
      dirCallback(fullpath)
      // in case the dirCallback removes the directory entirely
      if (fs.existsSync(fullpath)) {
        preOrderDirectoryTraverse(fullpath, dirCallback, fileCallback)
      }
      continue
    }
    fileCallback(fullpath)
  }
}
exports.preOrderDirectoryTraverse = preOrderDirectoryTraverse
function postOrderDirectoryTraverse(dir, dirCallback, fileCallback) {
  for (var _i = 0, _a = fs.readdirSync(dir); _i < _a.length; _i++) {
    var filename = _a[_i]
    if (filename === '.git') {
      continue
    }
    var fullpath = path.resolve(dir, filename)
    if (fs.lstatSync(fullpath).isDirectory()) {
      postOrderDirectoryTraverse(fullpath, dirCallback, fileCallback)
      dirCallback(fullpath)
      continue
    }
    fileCallback(fullpath)
  }
}
exports.postOrderDirectoryTraverse = postOrderDirectoryTraverse
//# sourceMappingURL=directoryTraverse.js.map
