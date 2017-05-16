#!/usr/bin/env node

const path = require('path');
const spawn = require('child_process').spawn;
const execSync = require('child_process').execSync;
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const Table = require('cli-table');

const log = console;

const scripts = [
    {
        label: 'Gives insight into bundle sizing.',
        value: 'analyze'
    },
    {
        label: 'Builds a production artifact.',
        value: 'build'
    },
    {
        label: 'Creates new modules and pages.',
        value: 'create'
    },
    {
        label: 'Starts local development environment.',
        value: 'start'
    },
    {
        label: 'Runs test suite along with linter.',
        value: 'test'
    }
];

function onCompletion(root) {
    const spacer = '  ';
    const text = chalk.gray;
    const success = chalk.green;

    log.info(success('\n✔ All done!'));
    log.info(text('\nInside your project directory, these commands can be run:\n'));

    const npmScripts = new Table({ head: ['Command', 'What does it do?'] });

    scripts.forEach((script) => {
        npmScripts.push([`npm run ${script.value}`, script.label])
    });

    log.info(npmScripts.toString());
    log.info(text(`\nYour project has been created at: ${chalk.bold(root)}`));
}

function installPackages(callback) {
    return (dependencies) => {
        // Run this as a NPM command
        let command = 'npm';
        // Arguments passed to the command
        let args = ['install', '-S', '-E'].concat(dependencies);

        // @TODO: figure out yarn connection failures
        // if (isYarnInstalled()) {
        //     command = 'yarn';
        //     args = ['add', '-E'].concat(dependencies);
        // }

        // Inform the end user whats going on
        log.info(chalk.gray('- Installing packages...'));
        // Invoke the process
        const install = spawn(command, args, { stdio: 'inherit' });
        // Once the process is finished, check for errors and call the next step
        install.on('close', (code) => {
            if (code !== 0) {
                log.info(chalk.red(`${code} ${command} ${args.join(' ')} failed.`));
                process.exit(1);
            }

            // Go to the next step
            callback();
        });
    }
}

/**
 * Check to see if the template used has any special dependencies to include.
 *
 * @param {String} root - Program path.
 * @param {Function} callback - Next step in the pipeline.
 * @return {undefined}
 */
function handleTemplateDependencies(root, callback) {
    const manifest = path.resolve(root, 'dependencies.js');
    function handler(err) {
        if (!err) {
            const dependencies = require(manifest);
            // Remove the additional-dependencies file from project
            fse.unlink(manifest, () => {
                callback()(dependencies);
            });
        } else {
            callback()([]);
        }
    }
    // Inform the user whats going on
    log.info(chalk.gray('- Checking for template specific dependencies.'));
    fse.access(manifest, handler);
}

function updatePackageJSON(root, callback) {
    // Pull in the existing package JSON to read from.
    const packageJSON = require(path.join(root, 'package.json'));
    // Package JSON contents to carry over / add to.
    packageJSON.dependencies = packageJSON.dependencies || {};
    packageJSON.devDependencies = packageJSON.devDependencies || {};
    packageJSON.scripts = scripts.reduce((acc, curr) => {
        if (curr.value) {
            acc[curr.value] = `cnn-starter-app ${curr.value}`;
        }
        return acc;
    }, {});

    // Path to write the file to.
    const file = path.join(root, 'package.json');
    // @TODO: switch to use fse.writeJSON? Making this step moot.
    const data = JSON.stringify(packageJSON, null, 2);
    // Inform the user whats going on
    log.info(chalk.gray(`- Updating package.json.`));
    // Update the file
    fse.writeFile(file, data, callback);
}

function renameNPMIgnore(root, callback) {
    const oldPath = path.join(root, '.npmignore');
    const newPath = path.join(root, '.gitignore');
    fse.rename(oldPath, newPath, callback);
}

/**
 * Copy over scaffolding and files.
 *
 * @param {String} root - Full project path
 * @param {String} type - Template type to work with
 * @param {Function} callback - Next step in the pipeline
 * @return {undefined}
 */
function copyTemplateFiles(root, type, callback) {
    // Source: Template files
    const src = path.join(root, 'node_modules', type, 'src', 'structure');
    // Destination: project-root/src
    const dest = path.join(root);
    // Inform the user whats going on
    log.info(chalk.gray(`- Copying template files.`));
    // Copy the files
    fse.copy(src, dest, callback);
}

function create(root, type) {
    const step6 = onCompletion.bind(null, root);
    const step5 = installPackages.bind(null, step6);
    const step4 = handleTemplateDependencies.bind(null, root, step5);
    const step3 = updatePackageJSON.bind(null, root, step4);
    const step2 = renameNPMIgnore.bind(null, root, step3);
    const step1 = copyTemplateFiles.bind(null, root, type, step2);

    step1();
}

module.exports = {
    create,
    scripts
};
