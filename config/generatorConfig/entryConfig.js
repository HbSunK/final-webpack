const path = require('path')
const {
    getDirList, 
    getCustomConfig,
    isEmptyObject
} = require('../utils')

const basePath = '../src/entry-pages'
const entryFileName = 'index.js'
const customConfigs = {}

function fetchEntries () {
    const options = {}
    const dirList = getDirList(basePath)
    const filePath = dirList.map(path => `${basePath}/${path}`)
    const files = getDirList(filePath)
    
    for (let i = 0; i < files.length; i++) {
        const curDir = dirList[i]
        const curFileList = files[i]
        const entryPath = path.resolve(__dirname, '../', filePath[i])
        const customConfig = getCustomConfig(curFileList, entryPath)

        // 如果自定义配置的入口存在，就使用自定义的配置，并且存储当前的自定义配置
        if (customConfig && !isEmptyObject(customConfig)) {

            customConfigs[curDir] = customConfig

            if (customConfig.entry) {
                options[curDir] = path.resolve(entryPath, customConfig.entry)
                continue
            }
        }

        // 当前目录下没有默认的入口文件，就跳过当前循环
        if (!curFileList.includes(entryFileName)) {
            continue
        }

        options[curDir] = path.resolve(entryPath, entryFileName)
    }

    return options
}

module.exports = {
    entryConfig: fetchEntries(),
    customConfigs
}