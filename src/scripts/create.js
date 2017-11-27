#!/usr/bin/env node

const spawn = require('child_process').spawn;

const command = 'cnn-react-generators';
const args = [];
spawn(command, args, { stdio: 'inherit' });
