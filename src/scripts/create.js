#!/usr/bin/env node

const spawn = require('child_process').spawn;

const command = 'cnn-react-generators';
const args = [];
const child = spawn(command, args, { stdio: 'inherit' });
