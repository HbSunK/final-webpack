const path = require('path')
const fs = require('path')
const merge = require('webpack-merge')

const { initNodeEnv } = require('./utils')
const config = require('./generatorConfig/index')
const env = require('../env/env_production')

initNodeEnv(env)

module.exports = config({
    mode: 'development',

    // cheap-module-eval-source-map is faster for development
    devtool: 'source-map',

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: 'localhost',
        port: '8080',
        // disableHostCheck: true,
        open: true,
        quiet: false, // necessary for FriendlyErrorsPlugin
    }
})