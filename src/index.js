#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

const { program } = require('commander');
const { version } = require('../package.json');
const shelljs = require('shelljs');
require('colors');

program.name('dragondungeon');
program.version(version);

program
  .command('dev')
  .description('run Dragon Dungeon in developer mode')
  .action(() => {
    console.log('Starting Dragon Dungeon in developer mode...'.yellow);
  });

program
  .command('start')
  .description('run Dragon Dungeon')
  .action(() => {
    console.log('Starting Dragon Dungeon...'.green);
    console.log('[1/3] '.yellow.bold + 'Game Server'.yellow);
    shelljs.exec('yarn workspace @dragondungeon/common start');
    console.log('[2/3] '.yellow.bold + 'Main Website'.yellow);
    shelljs.exec('yarn workspace @dragondungeon/site start');
    console.log('[3/3] '.yellow.bold + 'Game Client'.yellow);
    shelljs.exec('yarn workspace @dragondungeon/client start');
  });

program
  .command('build')
  .description('build Dragon Dungeon')
  .action(() => {
    console.log('Building Dragon Dungeon...'.yellow);
    console.log('[1/3] '.yellow.bold + 'Common Libraries'.yellow);
    shelljs.exec('yarn workspace @dragondungeon/common build');
    console.log('[2/3] '.yellow.bold + 'Main Website'.yellow);
    shelljs.exec('yarn workspace @dragondungeon/site build');
    console.log('[3/3] '.yellow.bold + 'Game Client'.yellow);
    shelljs.exec('yarn workspace @dragondungeon/client build');
    console.log('Dragon Dungeon Build Finished!'.green);
  });

program.parse(process.argv);