import React, { Component }  from 'react';
import Helmet from 'react-helmet';
import greeting from './greetings.js';

/**
 * Homepage
 */
class Homepage extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>CNN React Starter Homepage</title>
                </Helmet>
                <h1>{greeting}</h1>
                <p>You are now ready to start working on your React project! This project is still at an early stage, so please bear with us as we keep trucking along.</p>

                <h2>Things to try</h2>

                <h3>Healthcheck</h3>
                <p>View runtime data and system information. <a href="/_healthcheck">View healthcheck</a></p>

                <h3>Create Modules & Pages</h3>
                <p>You can use helper scripts to automatially create new modules and pages for your project.</p>
                <pre dangerouslySetInnerHTML={{ __html: '$ npm run create'}} />
                <p>Modules will be palced in the <code>app/modules</code> directory. Pages will be placed inside the <code>app/pages</code> directory, as well as added to the <code>app/routes.js</code> file.</p>

                <h3>Analyze Bundle Size</h3>
                <p>Pinpoint greedy modules that may be balooning your generated bundle sizes.</p>
                <pre dangerouslySetInnerHTML={{ __html: '$ npm run analyze'}} />
            </div>
        );
    }
}

export default Homepage;
