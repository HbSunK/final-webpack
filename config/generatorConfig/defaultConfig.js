const path = require('path')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const { assetsPath } = require('../utils')

const defaultConfig = {
    assetsSubDirectory: 'static',
    chunks: [
        'commons'
    ],
    customConfig: {
        fileName: 'config.js',
        entryPath: '../../src/entry-pages/'
    }
}

function resolve(dir) {
    return path.join(__dirname, '../../', dir)
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
                {
                    test: /\.(js|jsx|ts)$/,
                    loader: 'babel-loader',
                    include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
                },
                {
                    test: /\.(png|jpe?g|gif)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 10,
                        name: assetsPath('img/[name].[hash:7].[ext]'),
                        // publicPath: '../../',
                        // outputPath: 'static/img',
                        // name: utils.assetsPath('img/[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.(svg)(\?.*)?$/,
                    loader: 'file-loader',
                    options: {
                        name: assetsPath('img/[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 10,
                        name: assetsPath('media/[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 10,
                        name: assetsPath('fonts/[name].[hash:7].[ext]')
                    }
                }
            ]
        },
        plugins: [
            new OptimizeCSSPlugin({
                cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
                cssProcessorOptions: {
                    discardComments: { removeAll: true }
                }
            })
        ],
        optimization: {
            usedExports: true,                  //哪些导出的模块被使用了，再做打包
            splitChunks: {
                chunks: 'all',                  // 所有的chunks代码公共部分分离出来成为一个单独的文件
                cacheGroups: {
                    //缓存组
                    vue: {
                        test: /vue|vue-router|vuex/,
                        name: 'vue',
                        minChunks: 1,
                        priority: 10
                    },
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'commons',
                        chunks: 'all',
                        minChunks: 2
                    },
                    default: {
                        reuseExistingChunk: true,   // 如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
                    }
                }
            },
            minimize: true,
        },
    }
}

module.exports = genDefaultConfig