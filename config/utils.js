const pathFn = require('path')
const fs = require('fs')
const dotenv = require('dotenv')
const rimraf = require('rimraf')
const dotenvExpand = require('dotenv-expand')

const configFileName = 'config.js'
const createDir = path => fs.readdirSync(pathFn.join(__dirname, path), 'utf8')

// 获取某个文件下的文件列表，可传字符串格式的地址，也可传用字符串地址组成的数组
function getDirList(path) {
    if (!path) return
    
    if (Array.isArray(path)) {
        return path.map(curPath => getDirList(curPath))
    } else if (typeof path === 'string') {
        return createDir(path)
    }
}

// 获取单个入口的自定义配置
function getCustomConfig(dirList = [], entryPath) {
    let result = {}

    if (!entryPath) return result

    const hasCustomConfig = dirList.includes(configFileName)

    if (hasCustomConfig) {
        result = require(pathFn.resolve(entryPath, configFileName))
    }

    return result
}

function isEmptyObject (obj) {
    if (!obj || typeof obj !== 'object') return false

    return JSON.stringify(obj) === '{}'
}

function clearDist () {
    try {
        rimraf.sync(pathFn.join(__dirname, '../dist'))
        console.log('清空 dist 目录')
    } catch (e) {
        console.error(e)
    }
    try {
        rimraf.sync(pathFn.join(__dirname, '../bundle_analyze'))
        console.log('清空 bundle_analyze 目录')
    } catch (e) {
        console.error(e)
    }
}

module.exports = {
    getDirList,
    getCustomConfig,
    isEmptyObject,
    clearDist
}