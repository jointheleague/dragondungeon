#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

let shelljs = require('shelljs');
require('colors');

if (!shelljs.which('yarn')) {
  console.log('NPM and Yarn are required to run Dragon Dungeon.'.red);
  process.exit(1);
} else {
  shelljs.exec('yarn', { silent: true });
  shelljs.exec('yarn start');
}