import React, { Component, PropTypes } from 'react';

/**
 * @example
 * ```
 * <Route
 *      path='/test'
 *      component={(props) => (<AsyncRoute props={props} loadingPromise={System.import('./path/to/page/component')} />)}
 * />
 * ```
 */
class AsyncRoute extends Component {

    static propTypes = {
        loadingPromise: PropTypes.object,
        placeholder: PropTypes.node,
        props: PropTypes.object
    };

    state = {
        isLoaded: false
    };

    componentDidMount() {
        this.props.loadingPromise.then((module) => {
            this.component = module.default;
            this.setState({ isLoaded: true });
        });
    }

    render() {
        const { isLoaded } = this.state;
        const { props, placeholder } = this.props;
        return (isLoaded && (
            <this.component {...props} />
        )) || (
            placeholder || <div />
        );
    }

}

export default AsyncRoute;
