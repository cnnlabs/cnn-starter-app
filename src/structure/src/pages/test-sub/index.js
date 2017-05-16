import React, { Component }  from 'react';
import Helmet from 'react-helmet';

/**
 * TestSub
 */
class TestSub extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Test Sub Page</title>
                    <meta name="description" content="Test Sub" />
                </Helmet>
                <h1>Test Sub</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur doloribus ducimus hic ipsum libero maxime molestiae natus, odio odit quasi quis ratione sapiente similique ullam unde, ut voluptatem, voluptates.</p>
                <h2>Params</h2>
                <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </div>
        );
    }
}

export default TestSub;
