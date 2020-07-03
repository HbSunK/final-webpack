const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

function genHtmlWebpackPlugins(entryName, customConf) {
    // htmlWebpackPlugin在配置合并的时候，只会合并以下属性，过滤其他奇怪的属性，防止意外情况发生
    const keyMap = [
        'template',
        'filename',
        'title'
    ]
    const curCustomConf = customConf[entryName]
    let curConfig = genDefaultHtmlWebpackPlugin()

    // 自定义配置存在就使用自定义的配置覆盖默认配置
    if (curCustomConf) {
        const configKeys = Object.keys(curCustomConf).filter(key => keyMap.includes(key))
        const config = {}
        
        configKeys.forEach(key => {
            config[key] = path.join(
                __dirname,
                (key === 'template' ? `../../src/entry-pages/${entryName}` : './'),
                curCustomConf[key]
            )
        })
        curConfig = merge(curConfig, config)
    }

    curConfig.chunks.push(entryName)

    return new HtmlWebpackPlugin(curConfig)
}

function genDefaultHtmlWebpackPlugin () {
    return {
        template: 'src/public/index.html',
        filename: 'index.html',              // 对生成的模板重新命名
        title: 'default title',
        chunks: [],
        attributes: {
            crossorigin: 'anonymous'
        },
        minify: {
            // 压缩 HTML 文件
            removeComments: true,           // 移除 HTML 中的注释
            collapseWhitespace: true,       // 删除空白符与换行符
            minifyCSS: true                 // 压缩内联 css
        }
    }
}

module.exports = {
    genHtmlWebpackPlugins
}