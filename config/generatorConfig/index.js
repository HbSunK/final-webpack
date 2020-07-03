const fs = require('fs')
const path = require('path')
const merge = require('webpack-merge')

const { genHtmlWebpackPlugins } = require('./plugins')
const { entryConfig, customConfigs } = require('./entryConfig')
const outputConfig = require('./outputConfig')
const defaultConfig = require('./defaultConfig')

// console.log(genHtmlWebpackPlugins('login', customConfigs))
// genHtmlWebpackPlugins(entryConfig, customConfigs)

console.log(entryConfig)
console.log(customConfigs)

function genDefaultConfig(envConfig = {}) {
    return merge({}, defaultConfig(), envConfig)
}

function genConfig (envConfig = {}) {
    return Object.keys(entryConfig).map(entryName => {
        const config = {
            plugins: []
        }
        const defaultConfig = genDefaultConfig(envConfig)
        const curCustomConfig = customConfigs[entryName]

        config.entry = {
            [entryName]: entryConfig[entryName]
        }

        config.output = outputConfig(entryName)

        config.plugins.push(genHtmlWebpackPlugins(entryName, curCustomConfig || {}))

        if (curCustomConfig && curCustomConfig.plugins) {
            config.plugins.push(...curCustomConfig.plugins)
        }

        return merge(defaultConfig, config)
    })
}

module.exports = genConfig
