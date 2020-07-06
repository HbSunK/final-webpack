const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssRegExp = /\.(css|less|scss)$/

function genDefaultCssLoader (loaderName, pathName) {
    return {
        loader: `${loaderName}-loader`,
        // options: {
        //     outputPath: pathName
        // }
    }
}

function genCssLoader (entryName) {
    const loaderList = ['css', 'postcss', 'sass', 'less']
    const defaultConfig = {
        test: cssRegExp,
        use: [
            MiniCssExtractPlugin.loader
        ]
    }

    defaultConfig.use.arrayConcat(loaderList.map(loader => genDefaultCssLoader(loader)))
    
    return defaultConfig
}

function genLoaders(entryName) {
    return [
        genCssLoader(entryName)
    ]
}

module.exports = genLoaders