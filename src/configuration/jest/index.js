'use strict';

const fs = require('fs');

/**
 * Creates a configuration object to control Jest's behavior.
 *
 * {@link https://facebook.github.io/jest/docs/configuration.html#content}
 * @param {Function} resolve    A resolver function that accepts a relative path
 * @param {String}   rootDir    The root directory for the tests
 * @return {Object}             The Jest configuration object
 */
const createJestConfig = (resolve, rootDir) => {
    const setupFileName = `${rootDir}/src/setupTests.js`;
    const setupFile = fs.existsSync(setupFileName) ? setupFileName : undefined;

    return {
        rootDir,
        transform: {
            '^.+\\.(js|jsx)$': resolve('configuration/jest/babelTransform')
        },
        moduleNameMapper: {
            '^.+\\.css$': 'identity-obj-proxy'
        },
        moduleDirectories: ['node_modules', 'src'],
        setupTestFrameworkScriptFile: setupFile
    };
};

module.exports = createJestConfig;
