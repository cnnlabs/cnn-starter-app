#!/usr/bin/env node

const fse = require('fs-extra');
const chalk = require('chalk');
const resolve = require('path').resolve;
const spawn = require('child_process').spawn;

// @TODO: Fix this -- add ability to pass in args
const argv = process.argv

const log = console;

// Set the environment to production.
process.env.NODE_ENV = 'production';

function build(callback) {
    return (config) => {
        const command = 'webpack';
        const args = [
            '--config', config,
            '-p'
        ];

        log.info(chalk.gray('- Building bundles.'));

        const child = spawn(command, args, { stdio: 'inherit' });
        child.on('close', (code) => {
            if (code !== 0) {
                log.error(chalk.red(`${code} ${command} ${args.join(' ')} failed.`));
                process.exit(1);
            }
            callback();
        })
    }
}

function determineConfig(callback) {
    let config = resolve(__dirname, '../configuration/webpack.production.js');
    const override = resolve(process.cwd(), 'webpack.production.js');

    log.info(chalk.gray('- Checking which webpack config to use.'));

    try {
        const test = require(override);
        config = override;
    } catch (e) {
        // no override configuration found
    }

    callback()(config);
}

function clean(dir, callback) {
    log.info(chalk.gray('- Cleaning up any old build files.'));
    fse.remove(dir, (err) => {
        if (err) {
            log.error(chalk.red(`Failed removing directory: ${dir}`));
        }
        callback();
    })
}

(function init(){
    const step4 = () => { log.info(chalk.green('\n✔ All done!')) };
    const step3 = build.bind(null, step4);
    const step2 = determineConfig.bind(null, step3);
    const step1 = clean.bind(null, resolve(process.cwd(), 'dist'), step2);
    // @TODO: check for global webpack... else use node_modules

    step1();
})();
