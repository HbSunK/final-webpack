const path = require('path')

function createOutput (outputName) {
    return {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../../', 'dist', outputName || ''),
        publicPath: '',                   // 页面资源引用的路径或者 CDN 地址
    }
}

module.exports = createOutput