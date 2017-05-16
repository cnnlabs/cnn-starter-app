import React, { Component }  from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

/**
 * Test
 */
class Test extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Test Page</title>
                    <meta name="description" content="Test" />
                </Helmet>
                <h1>Test</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur doloribus ducimus hic ipsum libero maxime molestiae natus, odio odit quasi quis ratione sapiente similique ullam unde, ut voluptatem, voluptates.</p>
                <Link to="/test/sub">Link to sub page</Link>
                <h2>Params</h2>
                <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </div>
        );
    }
}

export default Test;
