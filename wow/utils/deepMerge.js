'use strict'
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i)
          ar[i] = from[i]
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from))
  }
Object.defineProperty(exports, '__esModule', { value: true })
var isObject = function (val) {
  return val && typeof val === 'object'
}
var mergeArrayWithDedupe = function (a, b) {
  return Array.from(new Set(__spreadArray(__spreadArray([], a, true), b, true)))
}
/**
 * Recursively merge the content of the new object to the existing one
 * @param {Object} target the existing object
 * @param {Object} obj the new object
 */
function deepMerge(target, obj) {
  for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
    var key = _a[_i]
    var oldVal = target[key]
    var newVal = obj[key]
    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = mergeArrayWithDedupe(oldVal, newVal)
    } else if (isObject(oldVal) && isObject(newVal)) {
      target[key] = deepMerge(oldVal, newVal)
    } else {
      target[key] = newVal
    }
  }
  return target
}
exports.default = deepMerge
//# sourceMappingURL=deepMerge.js.map
