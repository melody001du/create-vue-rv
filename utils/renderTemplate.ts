import * as fs from 'node:fs'
import * as path from 'node:path'
import { pathToFileURL } from 'node:url'

import deepMerge from './deepMerge'
import sortDependencies from './sortDependencies'

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
  const stats = fs.statSync(src)

  // path.basename 返回当前路径的目录或文件

  if (stats.isDirectory()) {
    // skip node_module
    if (path.basename(src) === 'node_modules') {
      return
    }

    // if it's a directory, render its subdirectories and files recursively
    // dest 使用者要创建的目录地址
    fs.mkdirSync(dest, { recursive: true })
    // 递归文件夹创建文件
    for (const file of fs.readdirSync(src)) {
      renderTemplate(path.resolve(src, file), path.resolve(dest, file), callbacks)
    }
    return
  }

  const filename = path.basename(src)
  // 在上一步已经根据 dest 创建好了 package.json
  if (filename === 'package.json' && fs.existsSync(dest)) {
    // merge instead of overwriting
    const existing = JSON.parse(fs.readFileSync(dest, 'utf8'))
    const newPackage = JSON.parse(fs.readFileSync(src, 'utf8'))
    // 合并、去重、排序(字符序) package.json
    const pkg = sortDependencies(deepMerge(existing, newPackage))
    fs.writeFileSync(dest, JSON.stringify(pkg, null, 2) + '\n')
    return
  }

  if (filename === 'extensions.json' && fs.existsSync(dest)) {
    // merge instead of overwriting
    const existing = JSON.parse(fs.readFileSync(dest, 'utf8'))
    const newExtensions = JSON.parse(fs.readFileSync(src, 'utf8'))
    const extensions = deepMerge(existing, newExtensions)
    fs.writeFileSync(dest, JSON.stringify(extensions, null, 2) + '\n')
    return
  }

  if (filename.startsWith('_')) {
    // rename `_file` to `.file`
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'))
  }

  // 追加 .gitignore
  if (filename === '_gitignore' && fs.existsSync(dest)) {
    // append to existing .gitignore
    const existing = fs.readFileSync(dest, 'utf8')
    const newGitignore = fs.readFileSync(src, 'utf8')
    fs.writeFileSync(dest, existing + '\n' + newGitignore)
    return
  }

  // data file for EJS templates
  // node 环境中使用 mjs 语法，import 只能导入 .mjs 模块
  if (filename.endsWith('.data.mjs')) {
    // use dest path as key for the data store
    dest = dest.replace(/\.data\.mjs$/, '')

    // Add a callback to the array for late usage when template files are being processed
    callbacks.push(async (dataStore) => {
      const getData = (await import(pathToFileURL(src).toString())).default

      // Though current `getData` are all sync, we still retain the possibility of async
      dataStore[dest] = await getData({
        oldData: dataStore[dest] || {}
      })
    })

    return // skip copying the data file
  }

  // [node_modules, package.json, extensions.json, _gitignore, data.mjs] 以外的模块直接复制
  fs.copyFileSync(src, dest)
}

export default renderTemplate
