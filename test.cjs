const path = require('path')
const { pathToFileURL } = require('url')

// const res = new URL('./template', import.meta.url)
// console.log(res)
// console.log(pathToFileURL(res.toString()))

// console.log(process.cwd())
// const file = process.cwd() + '/a.js'
// console.log(path.basename(process.cwd()))
// console.log(path.basename(file))

// console.log(pathToFileURL('./package.json').toString())
// const url = pathToFileURL('../utils/banners.js').toString()

// const rr = import(url).default
// console.log(rr)

console.log(path.relative('./aa', './aa/cdw/www'))
