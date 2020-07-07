const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')

const configFileName = 'config.js'
const createDir = _path => fs.readdirSync(path.join(__dirname, _path), 'utf8')

function assetsPath (asssetFile) {
    return path.posix.join('static', asssetFile)
}

// 获取某个文件下的文件列表，可传字符串格式的地址，也可传用字符串地址组成的数组
function getDirList(_path) {
    if (!_path) return
    
    if (Array.isArray(_path)) {
        return _path.map(curPath => getDirList(curPath))
    } else if (typeof _path === 'string') {
        return createDir(_path)
    }
}

// 获取单个入口的自定义配置
function getCustomConfig(dirList = [], entryPath) {
    let result = {}

    if (!entryPath) return result

    const hasCustomConfig = dirList.includes(configFileName)

    if (hasCustomConfig) {
        result = require(path.resolve(entryPath, configFileName))
    }

    return result
}

function isEmptyObject (obj) {
    if (!obj || typeof obj !== 'object') return false

    return JSON.stringify(obj) === '{}'
}

function clearDist () {
    try {
        rimraf.sync(path.join(__dirname, '../dist'))
        console.log('清空 dist 目录')
    } catch (e) {
        console.error(e)
    }
    try {
        rimraf.sync(path.join(__dirname, '../bundle_analyze'))
        console.log('清空 bundle_analyze 目录')
    } catch (e) {
        console.error(e)
    }
    console.log('\n')
}

function initNodeEnv (config) {
    if (!config || typeof config !== 'object') return

    Object.keys(config).forEach(envKey => {
        process.env[envKey] = config[envKey]
    })
}

module.exports = {
    assetsPath,
    getDirList,
    getCustomConfig,
    isEmptyObject,
    clearDist,
    initNodeEnv
}