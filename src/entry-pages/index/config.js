const path = require('path')
const fs = require('fs')
const myPlugins = require('./plugins/sparrow')

module.exports = {
    entry: './index.js',
    template: './plulic/index.html',
    plugins: [
        new myPlugins()
    ]
}