'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function getCommand(packageManager, scriptName, args) {
  if (scriptName === 'install') {
    return packageManager === 'yarn' ? 'yarn' : ''.concat(packageManager, ' install')
  }
  if (args) {
    return packageManager === 'npm'
      ? 'npm run '.concat(scriptName, ' -- ').concat(args)
      : ''.concat(packageManager, ' ').concat(scriptName, ' ').concat(args)
  } else {
    return packageManager === 'npm'
      ? 'npm run '.concat(scriptName)
      : ''.concat(packageManager, ' ').concat(scriptName)
  }
}
exports.default = getCommand
//# sourceMappingURL=getCommand.js.map
