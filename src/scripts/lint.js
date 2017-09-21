#!/usr/bin/env node

const { spawn } = require('child_process');

const command = 'cnn-birdman';
const args = [
    'run'
];

const child = spawn(command, args, { stdio: 'inherit' });

child.on('close', done(process));


/*
 * Exposes the child process return value as the return value for this
 * execution of the script.
 */
function done(process) {

    return function exitWith(code) {

        process.exit(code);
    }
}
