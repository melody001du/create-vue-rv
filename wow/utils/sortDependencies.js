'use strict'
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
Object.defineProperty(exports, '__esModule', { value: true })
function sortDependencies(packageJson) {
  var sorted = {}
  var depTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']
  var _loop_1 = function (depType) {
    if (packageJson[depType]) {
      sorted[depType] = {}
      Object.keys(packageJson[depType])
        .sort()
        .forEach(function (name) {
          sorted[depType][name] = packageJson[depType][name]
        })
    }
  }
  for (var _i = 0, depTypes_1 = depTypes; _i < depTypes_1.length; _i++) {
    var depType = depTypes_1[_i]
    _loop_1(depType)
  }
  return __assign(__assign({}, packageJson), sorted)
}
exports.default = sortDependencies
//# sourceMappingURL=sortDependencies.js.map
