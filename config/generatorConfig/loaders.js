const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssRegExp = /\.(css|less|scss)$/

function genDefaultCssLoader(loader, pathName) {
    return {
        loader: `${loader.name ? loader.name : loader}-loader`,
        options: loader.options || {}
    }
}

function genCssLoader (entryName) {
    const loaderList = [{
        name: 'css',
        options: {}
    }, 'postcss', 'sass', 'less']
    const defaultConfig = {
        test: cssRegExp,
        use: [{
            loader: MiniCssExtractPlugin.loader
        }]
    }

    defaultConfig.use.arrayConcat(loaderList.map(loader => genDefaultCssLoader(loader)))
    
    return defaultConfig
}

function genLoaders(entryName) {
    return [
        genCssLoader(entryName)
    ]
}

function cssLoaders (options, module) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = [cssLoader]

        if (module && module.splitMediaQueryCSS) {
            loaders.push(MediaQueryPlugin.loader)
        }
        if (options.usePostCSS) {
            loaders.push(postcssLoader)
        }

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        // If split media query css, we must extract css.
        return [
            options.extract || (module && module.splitMediaQueryCSS)
                ? MiniCssExtractPlugin.loader
                : 'vue-style-loader',
        ].concat(loaders)
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass')
    }
}

// Generate loaders for standalone style files (outside of .vue)
function styleLoaders (module, options) {
    const output = []
    const loaders = cssLoaders(options, module)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
}

module.exports = {
    genLoaders,
    styleLoaders,
    cssLoaders
}