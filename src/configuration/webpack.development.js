const webpack = require('webpack');
const resolve = require('path').resolve;
const join = require('path').join;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const filteredClientEnvVars = require('./client-env-vars.js')();

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
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: [
            'babel-polyfill',
            // @TODO if this is a web-application use these, else...
            // activate HMR for React
            'react-hot-loader/patch',
            // @TODO: add polyfill support
            // // enable hot reloading
            'webpack-hot-middleware/client?reload=true',
            // the entry point of our root
            resolve(process.cwd(), paths.appEntry)
        ]
    },
    output: {
        // the output bundle
        filename: '[name].js',
        // the output path
        path: resolve(process.cwd(), paths.output),
        // necessary for HMR to know where to load the hot update chunks
        publicPath: paths.publicPath
        // @TODO: sourcemap entries
    },
    module: {
        // @TODO: add support for url-loader
        // - https://github.com/webpack-contrib/url-loader
        rules: [
            // linting
            {
                // @TODO: when we remove the ability to extend eslint, update this
                // @TODO: add eslintPath, never assume global
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                // https://github.com/MoOx/eslint-loader
                loader: 'eslint-loader'
            },
            // styles
            {
                test: /\.css$/,
                use: [
                    // https://github.com/webpack-contrib/style-loader
                    'style-loader',
                    {
                        // https://github.com/webpack-contrib/css-loader
                        loader: 'css-loader',
                        options: {
                            // Number of loaders applied before CSS loader
                            importLoaders: 1,
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
            },
            // transpilation
            {
                // @TODO: when we remove the ability to extend babelrc, update this
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                // https://github.com/babel/babel-loader
                loader: 'babel-loader'
            },
            // html
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
        // enable HMR globally
        // https://webpack.js.org/plugins/hot-module-replacement-plugin/
        new webpack.HotModuleReplacementPlugin(),
        // prints more readable module names in the browser console on HMR updates
        // https://webpack.js.org/guides/caching/#deterministic-hashes
        new webpack.NamedModulesPlugin(),
        // split out vendor
        // https://webpack.js.org/plugins/commons-chunk-plugin/
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
        // https://webpack.js.org/plugins/commons-chunk-plugin/
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        // creates a manifest of assets we can use within server-side rendering
        // https://github.com/kossnocorp/assets-webpack-plugin
        new AssetsPlugin({
            filename: 'assets.json',
            path: join(process.cwd(), 'dist')
        }),
        // injects webpack bundles into our html file
        // https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: resolve(process.cwd(), paths.htmlPath)
        })
    ],
    resolve: {
        // @TODO: add opt-in support for preact-compat / inferno-compat
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
