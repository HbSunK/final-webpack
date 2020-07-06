const path = require('path')
const fs = require('path')
const merge = require('webpack-merge')
const { clearDist } = require('./utils')
const config = require('./generatorConfig/index')

clearDist()

module.exports = config({
    // mode: 'development',
    mode: 'production',
    devtool: 'source-map',
})