import React from 'react';
import AsyncRoute from 'modules/async-route';

const noMatch = {
    component: (props) => (
        <AsyncRoute props={props} loadingPromise={import('./pages/no-match')} />
    )
};

const routes = [
    {
        path: '/',
        exact: true,
        component: (props) => (
            <AsyncRoute props={props} loadingPromise={import('./pages/homepage')} />
        )
    },
    {
        path: '/test',
        exact: true,
        component: (props) => (
            <AsyncRoute props={props} loadingPromise={import('./pages/test')} />
        )
    },
    {
        path: '/test/sub',
        exact: false,
        component: (props) => (
            <AsyncRoute props={props} loadingPromise={import('./pages/test-sub')} />
        )
    }
]; // end of routes || DO NOT ALTER THIS LINE.

export default routes.concat(noMatch);
