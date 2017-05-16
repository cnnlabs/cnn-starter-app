import React from 'react';
import { render } from 'react-dom';

// `AppContainer` is a necessary wrapper component for hot module reloading.
// Note: if !module.hot or NODE_ENV === 'production', this container will
// simply act as a pass through.
import { AppContainer as HotReloadContainer } from 'react-hot-loader';

// client application wrapper
import App from './modules/root';

// load favicon
// import '!file-loader?name=[name].[ext]!./favicon.ico';
// TODO: need a larger icon for manifest.json, currently broken
// import '!file-loader?name=[name].[ext]!./manifest.json';

const mount = (RootComponent) => {
    render(
        <HotReloadContainer>
            <RootComponent />
        </HotReloadContainer>,
        document.getElementById('mount')
    );
};

// start the application
mount(App);

// hot module replacement API, this is only used for development environments
if (module.hot) {
    module.hot.accept('./modules/root', () => {
        const RootComponent = require('./modules/root').default;
        mount(RootComponent);
    });
}
