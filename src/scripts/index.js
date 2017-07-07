#!/usr/bin/env node

const spawn = require('child_process').spawn;
const { scripts } = require('../index.js');
const script = process.argv[2];
const argv = process.argv.slice(3);

const log = console;
const validScripts = scripts.map(script => script.value);

if (validScripts.indexOf(script) !== -1) {
    const command = 'node';
    const args = [
        require.resolve(`./${script}`)
    ].concat(argv);

    const run = spawn(command, args, { stdio: 'inherit' });
} else {
    log.error(`Command ${script} is not supported.`);
}
