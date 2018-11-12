require('dotenv').config()
const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

const isProduction =
    process.env.NODE_ENV === 'production' && process.env.WEBPACK_SERVE !== true

// Webpack-serve settings
const DEV_SERVER_HOST = '127.0.0.1'
const DEV_SERVER_PORT = '8080'
const DEV_SERVER_URL = `http://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}/`

// Create flag for hot reloading
if (process.env.WEBPACK_SERVE) {
    const hotFile = path.join(__dirname, 'public/hot')
    fs.writeFile(hotFile, DEV_SERVER_URL, (err) => {
        if (err) console.log(`Can't write file for hot reloading!`)
        console.log('Hot reloading enabled on backend!')
    })
    process.on('exit', code => {
        fs.unlink(hotFile, () => console.log('Hot reloading disabled on backend!'))
    })
}

module.exports.mode = isProduction ? 'production' : 'development'

module.exports.entry = {
    app: './vue_app/app.js',
}

module.exports.output = {
    publicPath: process.env.WEBPACK_SERVE ? DEV_SERVER_URL : '/',
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].js'
}

module.exports.resolve = {
    extensions: ['.js', '.vue', '.css', '.scss', '.sass'],
    alias: {
        vue$: 'vue/dist/vue.esm.js',
        assets: path.resolve(__dirname, 'vue_app/assets'),
        scss: path.resolve(__dirname, 'vue_app/assets/scss'),
        components: path.resolve(__dirname, 'vue_app/components')
    }
}

module.exports.plugins = [
    new MiniCssExtractPlugin({
        filename: 'css/[name].css'
    }),
    new VueLoaderPlugin()
]

module.exports.module = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.css$/,
            exclude: path.resolve(__dirname, 'resources/assets/js/components'),
            use: [
                isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.(scss|sass)$/,
            exclude: path.resolve(__dirname, 'resources/assets/js/components'),
            use: [
                isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        // Always inline styles in Vue Component
        {
            test: /\.css$/,
            include: path.resolve(__dirname, 'resources/assets/js/components'),
            use: ['vue-style-loader', 'css-loader']
        },
        {
            test: /\.(scss|sass)$/,
            include: path.resolve(__dirname, 'resources/assets/js/components'),
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        indentedSyntax: true
                    }
                }
            ]
        },
        {
            test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
            exclude: path.resolve(__dirname, 'resources/assets/svg'),
            options: {
                name: 'fonts/[name].[ext]'
            }
        },
        {
            test: /\.(gif|png|jpg|ico)/,
            loader: 'file-loader',
            options: {
                name: 'images/vendors/[name].[ext]'
            }
        },
        {
            test: /\.svg$/,
            loader: 'svg-inline-loader',
            options: {
                removeTags: true
            }
        }
    ]
}

module.exports.optimization = {
    runtimeChunk: { name: 'vendor' },
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /node_modules/,
                name: 'vendor',
                chunks: 'initial',
                enforce: true
            }
        }
    }
}

/*
 Production options
 */
if (isProduction) {
    module.exports.devtool = false
    module.exports.optimization.minimizer = [
        new TerserPlugin(),
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: { discardComments: { removeAll: true } }
        })
    ]
}
/*
  Dev options
 */
if (!isProduction) {
    module.exports.devtool = 'eval'
}

module.exports.serve = {
    content: 'public/',
    clipboard: false,
    host: DEV_SERVER_HOST,
    port: DEV_SERVER_PORT,
    devMiddleware: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}