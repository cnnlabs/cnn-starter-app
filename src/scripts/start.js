#!/usr/bin/env node

const resolve = require('path').resolve;
const spawn = require('child_process').spawn;
const argv = process.argv;

process.env.NODE_ENV = 'development';

const command = 'node';
const args = [
    resolve(process.cwd(), 'server.js')
];

const child = spawn(command, args, { stdio: 'inherit' });

// @TODO: open browser?
