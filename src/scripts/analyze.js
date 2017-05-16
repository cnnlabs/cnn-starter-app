#!/usr/bin/env node

const fse = require('fs-extra');
const { exec, spawn } = require('child_process');
const resolve = require('path').resolve;

const log = console;

function viewAnalysis(callback) {
    const command = 'webpack-bundle-analyzer';
    const args = ['stats.json'];

    spawn(command, args, { stdio: 'inherit' });
}

function runAnalysis(callback) {
    // @TODO: Using Array syntax in order to pivot back to `spawn` later
    const command = [
        // kick off webpack
        'webpack',
        // specify where the configuration file lives
        '--config',
        // use production configuration
        resolve(__dirname, '../configuration/webpack.production.js'),
        // sets process.env.NODE_ENV to production, adds minification, etc
        '-p',
        // capture profile of the application, including stats and hints
        '--profile',
        // output json
        '--json', '>', 'stats.json',
    ].join(' ');
    // Inform the user whats going on
    log.info('Running webpack analysis...');
    // Kick off the process
    exec(command, (err, stdout, stderr) => {
        if (err) {
            log.error(`Error running analysis, failed with code: ${err.code}`);
            process.exit(1);
        }
        callback();
    });
}

function clean(callback) {
    // Inform the user whats going on
    log.info('Cleaning up any old stats.json files.');
    // Path to look for the stats.json file
    const file = resolve(process.cwd(), 'stats.json');
    // Remove the file
    fse.remove(file, callback);
}

const step3 = viewAnalysis;
const step2 = runAnalysis.bind(null, step3);
const step1 = clean.bind(null, step2);
step1();
