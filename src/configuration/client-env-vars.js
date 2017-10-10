if (!process.env.NODE_ENV) {
    console.warn('No NODE_ENV environment variable was defined.');
}

function filteredClientEnvVars() {

    const NAMESPACE = /^CNN_/i;

    const defaults = {
        NODE_ENV: process.env.NODE_ENV || 'development'
    };

    const filtered = Object.keys(process.env)
        .filter(key => NAMESPACE.test(key))
        .reduce((accumulator, key) => {
            accumulator[key] = process.env[key];
            return accumulator;
        }, defaults);

    return {
        'process.env': Object.keys(filtered).reduce((accumulator, key) => {
            accumulator[key] = JSON.stringify(filtered[key]);
            return accumulator;
        }, {})
    };
}

module.exports = filteredClientEnvVars;
