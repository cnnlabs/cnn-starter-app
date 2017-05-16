import React from 'react';
import AsyncRoute from 'modules/async-route';

// @TODO: find a better implentation for this
if (global) { global.System = { import() {} } }

const noMatch = {
    component: (props) => (
        <AsyncRoute props={props} loadingPromise={System.import('./pages/no-match')} />
    )
};

const routes = [
    {
        path: '/',
        exact: true,
        component: (props) => (
            <AsyncRoute props={props} loadingPromise={System.import('./pages/homepage')} />
        )
    },
    {
        path: '/test',
        exact: true,
        component: (props) => (
            <AsyncRoute props={props} loadingPromise={System.import('./pages/test')} />
        )
    },
    {
        path: '/test/sub',
        exact: false,
        component: (props) => (
            <AsyncRoute props={props} loadingPromise={System.import('./pages/test-sub')} />
        )
    }
]; // end of routes || DO NOT ALTER THIS LINE.

export default routes.concat(noMatch);
