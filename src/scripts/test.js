#!/usr/bin/env node

const jest = require('jest');
const { resolve } = require('path');
const argv = process.argv.slice(2);
const createJestConfig = require('../configuration/jest');

process.env.NODE_ENV = 'test';

argv.push(
    '--config',
    JSON.stringify(
        createJestConfig(
            path => resolve(__dirname, '..', path),
            resolve(process.cwd())
        )
    )
);

jest.run(argv);
