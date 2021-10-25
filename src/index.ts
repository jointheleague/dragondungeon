import { program } from 'commander';
import { createServer } from 'http';
import shelljs from 'shelljs';
import ora from 'ora';
import express from 'express';
import colors from 'colors';

import * as initializeServer from '../packages/server/src/index';

program.name('dragondungeon');

let app = express();
let server = createServer(app);

initializeServer(app);

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
  });

program
  .command('build')
  .description('build Dragon Dungeon')
  .action(() => {
    let buildSpinner = ora({
      text: 'Building Dragon Dungeon',
      color: 'red',
    }).start();
    console.log('\n\n');
    shelljs.exec('yarn workspace @dragondungeon/common build');
    shelljs.exec('yarn workspace @dragondungeon/site build');
    shelljs.exec('yarn workspace @dragondungeon/client build');
    buildSpinner.stop();
    console.log('Dragon Dungeon Build Finished!'.green);
  });

program.parse(process.argv);