const webpack = require('webpack');
const resolve = require('path').resolve;

let webpackConfig = require('./webpack.development.js');
const override = resolve(process.cwd(), 'webpack.development.js');

try {
    webpackConfig = require(override);
} catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
        console.log(`No override configuration found at ${override}. Using built-in config.`);
    } else {
        throw err;
    }
}

const compiler = webpack(webpackConfig);

const webpackDevHandler = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only'
});

const webpackHotHandler = require('webpack-hot-middleware')(compiler, {
    // @TODO: convert to global log
    log: console.info
});

const fs = webpackDevHandler.fileSystem;

const config = {
    port: 5050,
    middleware: [
        { handler: webpackDevHandler },
        { handler: webpackHotHandler }
    ],
    routes: [
        {
            path: '*',
            handler: (req, res, next) => {
                fs.readFile(resolve(compiler.outputPath, 'index.html'), (err, file) => {
                    if (err) {
                        log.error('Error sending file: ', err);
                        next();
                    } else {
                        res.send(file.toString());
                    }
                });
            }
        }
    ]
}

module.exports = config;
