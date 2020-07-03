const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function genDefaultConfig () {
    return {
        context: path.resolve(__dirname, '../../'),
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.vue', '.json', '.jsx', 'ts'],
            alias: {
                '@': resolve('src/entry-pages')
            }
        },
        module: {
            rules: [
                // {
                //     test: /\.pug$/,
                //     loader: 'pug-loader'
                // },
                // {
                //     test: /\.vue$/,
                //     loader: 'vue-loader',
                //     options: vueLoaderConfig
                // },
                // {
                //     test: /\.(js|jsx)$/,
                //     loader: 'babel-loader',
                //     include: [resolve('modules'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
                // },
                // {
                //     test: /\.(png|jpe?g|gif)(\?.*)?$/,
                //     loader: 'url-loader',
                //     options: {
                //         limit: 10000,
                //         name: utils.assetsPath('img/[name].[hash:7].[ext]')
                //     }
                // },
                // {
                //     test: /\.(svg)(\?.*)?$/,
                //     loader: 'file-loader',
                //     options: {
                //         name: utils.assetsPath('img/[name].[hash:7].[ext]')
                //     }
                // },
                // {
                //     test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                //     loader: 'url-loader',
                //     options: {
                //         limit: 10000,
                //         name: utils.assetsPath('media/[name].[hash:7].[ext]')
                //     }
                // },
                // {
                //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                //     loader: 'url-loader',
                //     options: {
                //         limit: 10000,
                //         name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                //     }
                // }
            ]
        },
        plugins: []
    }
}

module.exports = genDefaultConfig