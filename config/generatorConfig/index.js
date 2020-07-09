const fs = require('fs')
const path = require('path')
const merge = require('webpack-merge')

const extendPrototype = require('../../tools/extendPrototype')

const { entryConfig, customConfigs } = require('./entryConfig')
const outputConfig = require('./outputConfig')
const defaultConfig = require('./defaultConfig')
const genPlugins = require('./plugins')
const {genLoaders} = require('./loaders')

console.log('入口文件：')
console.log(entryConfig)
console.log('\n')

// 扩展原生对象方法
extendPrototype()

function genDefaultConfig(envConfig = {}) {
    return merge({}, defaultConfig(), envConfig)
}

function genConfig (envConfig = {}) {
    return Object.keys(entryConfig).map(entryName => {
        const defaultConfig = genDefaultConfig(envConfig)
        const curCustomConfig = customConfigs[entryName]
        const config = {
            mode: process.env.NODE_ENV,
            entry: {},
            plugins: [],
            module: {
                rules: []
            }
        }

        config.entry[entryName] = entryConfig[entryName]
        
        config.output = outputConfig(entryName)

        config.plugins.arrayConcat(genPlugins(entryName, curCustomConfig))

        config.module.rules.arrayConcat(genLoaders())

        // 添加自定义plugins和loader
        if (curCustomConfig) {
            if (curCustomConfig.plugins) {
                config.plugins.arrayConcat(curCustomConfig.plugins)
            }
            if (curCustomConfig.loaders) {
                
            }
        }

        return merge(defaultConfig, config)
    })
}

module.exports = genConfig
