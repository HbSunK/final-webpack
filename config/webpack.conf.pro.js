const path = require('path')
const fs = require('path')
const merge = require('webpack-merge')

const { clearDist, initNodeEnv } = require('./utils')
const config = require('./generatorConfig/index')
const env = require('../env/env_production')

clearDist()

initNodeEnv(env)

console.log(`当前环境：${process.env.NODE_ENV}`)

module.exports = config({
    // mode: 'development',
    // mode: process.env.NODE_ENV,
    devtool: 'source-map',
    plugins: [],
    module: {}
})
