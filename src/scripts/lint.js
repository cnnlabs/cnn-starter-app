#!/usr/bin/env node

const { spawn } = require('child_process');

const command = 'cnn-birdman';
const args = [
    'run'
];

const child = spawn(command, args, { stdio: 'inherit' });
