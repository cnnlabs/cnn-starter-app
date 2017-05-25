const webpack = require('webpack');
const resolve = require('path').resolve;
const join = require('path').join;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// @TODO: break this out into a separate file
const paths = {
    appEntry: 'src/index.js',
    appRoot: 'src',
    output: 'dist',
    publicPath: '/static/',
    htmlPath: 'src/index.html'
};

module.exports = {
    // @TODO: find a way to get this working a little better
    // https://webpack.js.org/configuration/devtool/
    devtool: 'source-map',
    entry: {
        main: [
            // @TODO if this is a web-application use these, else...
            // activate HMR for React
            // 'react-hot-loader/patch',
            // // enable hot reloading
            // 'webpack-hot-middleware/client?reload=true',
            // the entry point of our root
            resolve(process.cwd(), paths.appEntry)
        ]
    },
    output: {
        // the output bundle
        filename: '[name].[chunkhash].js',
        // the output path
        path: resolve(process.cwd(), paths.output),
        // necessary for HMR to know where to load the hot update chunks
        publicPath: paths.publicPath
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                               localIdentName: '[hash:8]',
                               modules: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('postcss-import'),
                                        require('postcss-cssnext')
                                    ]
                                }
                            }
                        }
                    ]
                })
            },
            // babel transpiler
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            // html files
            // this is currently only used for the HtmlWebpackPlugin
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        // define environment variables
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // extract css content
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
            allChunks: true
        }),
        // split out vendor
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
               // this assumes your vendor imports exist in the node_modules directory
               return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        // @TODO: inline manifest?
        // https://webpack.js.org/guides/caching/
        // CommonChunksPlugin will now extract all the common modules from
        // vendor and main bundles
        // https://webpack.js.org/guides/code-splitting-libraries/#manifest-file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new AssetsPlugin({
            filename: 'assets.json',
            path: join(process.cwd(), 'dist')
        }),
        // @TODO: UglifyJsPlugin?
        // injects webpack bundles into our html file
        new HtmlWebpackPlugin({
            template: resolve(process.cwd(), paths.htmlPath)
        })
    ],
    resolve: {
        modules: [
            resolve(process.cwd(), paths.appRoot),
            'node_modules'
        ]
    }
};
