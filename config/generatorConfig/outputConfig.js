const path = require('path')

function fetchOutput (outputName) {
    return {
        filename: 'static/[name].[hash:8].js',
        path: path.resolve(__dirname, '../../', 'dist', outputName || ''),
        publicPath: './static',                   // 页面资源引用的路径或者 CDN 地址
    }
}

module.exports = fetchOutput