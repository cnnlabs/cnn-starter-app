/**
 * Add any template specific dependencies here.
 *
 * @example
 * ```
 * const exposed = [
 *      'react-helmet',
 *      'foo@1.3.5'
 * ]
 * ```
 */

// these are packages that will be displayed inside the user's package.json
const exposed = [
    // core
    'react',
    'react-dom',
    'prop-types',

    // useful
    'react-hot-loader@3.0.0-beta.6',
    'react-helmet@5.0.3',
    'react-router-dom@4.1.1',

    // server
    'babel-resolver@1.1.0',
    "babel-register@6.24.1",
    'https://github.com/cnnlabs/cnn-server'
];


module.exports = exposed;
