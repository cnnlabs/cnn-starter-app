const webpack = require('webpack');
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require(resolve(process.cwd(), 'package.json'));
const publicPath = pkg.publicPath || '/static/';
const filteredClientEnvVars = require('./client-env-vars.js')();

// @TODO: break this out into a separate file
const paths = {
    appEntry: 'src/index.js',
    appRoot: 'src',
    output: 'dist',
    publicPath,
    htmlPath: 'src/index.html'
};

module.exports = {
    // @TODO: find a way to get this working a little better
    // https://webpack.js.org/configuration/devtool/
    // @TODO: removing sourcemaps for produciton until our
    // build pipeline omits them automatically.
    // devtool: 'source-map',
    entry: {
        main: [
            'babel-polyfill',
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
                            // https://github.com/webpack-contrib/css-loader
                            loader: 'css-loader',
                            options: {
                                // Configure the generated ident
                                localIdentName: '[hash:8]',
                                // Enable/Disable CSS Modules
                                modules: true
                            }
                        },
                        {
                            // https://github.com/postcss/postcss-loader
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
                test: /\.(js|jsx)$/,
                include: resolve(process.cwd(), paths.appRoot),
                // https://github.com/babel/babel-loader
                loader: 'babel-loader'
            },
            // html files
            // this is currently only used for the HtmlWebpackPlugin
            {
                test: /\.html$/,
                // https://github.com/webpack-contrib/html-loader
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        // define environment variables
        // https://webpack.js.org/plugins/define-plugin/
        new webpack.DefinePlugin(filteredClientEnvVars),
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
        // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // @TODO: UglifyJsPlugin?
        // injects webpack bundles into our html file
        new HtmlWebpackPlugin({
            template: resolve(process.cwd(), paths.htmlPath)
        })
    ],
    resolve: {
        // resolve certain extensions
        // https://webpack.js.org/configuration/resolve/#resolve-extensions
        extensions: ['.js', '.jsx', '.json'],
        // tells webpack where to look for modules
        // https://webpack.js.org/configuration/resolve/#resolve-modules
        modules: [
            resolve(process.cwd(), paths.appRoot),
            'node_modules'
        ]
    }
};
