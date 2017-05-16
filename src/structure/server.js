const server = require('cnn-server');

let config;

if (process.env.NODE_ENV === 'production') {

    require('babel-register')({
        resolveModuleSource: require('babel-resolver')(__dirname + '/src')
    });

    const handleSSR = (req, res) => {
        const React = require('react');
        const ReactDOMServer = require('react-dom/server');
        const { StaticRouter } = require('react-router');
        const App = require('./src/modules/shell/index.js').default;
        const HTML = require('./src/modules/html/index.js').default;
        const assets = require('./dist/assets.json');

        const context = {};

        const html = ReactDOMServer.renderToString(
            React.createElement(StaticRouter, {
                context,
                location: req.url
            }, React.createElement(App))
        );

        const doc = ReactDOMServer.renderToString(
            React.createElement(HTML, {
                html,
                assets
            })
        );

        if (context.url) {
            res.writeHead(301, { 'Location': context.url });
            res.end();
        } else {
            res.write('<!doctype html>' + doc);
            res.end();
        }

    }

    const handleStatic = (req, res) => {
        res.sendFile('index.html', {
            root: __dirname + '/dist/'
        });
    }

    // Create production configuration
    config = {
        enableStatic: true,
        routes: [
            {
                path: '*',
                handler: !!process.env.DISABLE_SSR ? handleStatic : handleSSR
            }
        ]
    };
} else {
    // Use default development configuration
    config = require('cnn-starter-app/src/configuration/server.development.js');
}

server(config);
