import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Shell from 'modules/shell';

function Root() {
    return (
        <Router>
            <Shell />
        </Router>
    );
}

// in order to support multiple platforms (web, server, native), we could export
// the various routers here - or handle in the setup.
//
// EXAMPLE:
// export const web = (props) => (<BrowserRouter><App /></BrowserRouter>)
// export const native = (props) => (<MemoryRouter><App /></MemoryRouter>)
// export const server = (props) => (<ServerRouter><App /></ServerRouter>)
//
// Need to make sure that the various packages are not included for all envs..

export default Root;
