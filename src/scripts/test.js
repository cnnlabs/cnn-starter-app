#!/usr/bin/env node

const chalk = require('chalk');
const resolve = require('path').resolve;
const spawn = require('child_process').spawn;

const log = console;

process.env.NODE_ENV = 'test';

log.info(chalk.yellow('Unit / e2e testing coming soon.'));

const command = 'cnn-birdman';
const args = [
    'run'
];

const child = spawn(command, args, { stdio: 'inherit' });
