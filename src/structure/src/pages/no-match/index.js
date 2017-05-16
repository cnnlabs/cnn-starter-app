import React, { Component } from 'react';
import Helmet from 'react-helmet';

/**
 * NoMatch
 */
class NoMatch extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Uh oh!</title>
                </Helmet>
                <h1>Uh-oh!</h1>
                <p>It could be you, or it could be us, but there's no page here.</p>
            </div>
        );
    }
}

export default NoMatch;
