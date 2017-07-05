'use strict';

/**
 * Creates a configuration object to control Jest's behavior.
 *
 * {@link https://facebook.github.io/jest/docs/configuration.html#content}
 * @param {Function} resolve    A resolver function that accepts a relative path
 * @param {String}   rootDir    The root directory for the tests
 * @return {Object}             The Jest configuration object
 */
const createJestConfig = (resolve, rootDir) => ({
    rootDir,
    transform: {
        '^.+\\.(js|jsx)$': resolve('configuration/jest/babelTransform')
    },
    moduleNameMapper: {
        '^.+\\.css$': 'identity-obj-proxy'
    }
});

module.exports = createJestConfig;
