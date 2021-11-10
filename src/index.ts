// DragonDungeon
// The LEAGUE of Amazing Programmers

// Imports
import express from 'express';

const webpack = require('webpack');
const wpmiddleware = require('webpack-dev-middleware');

import 'colors';
import { createServer } from 'http';
import { Server } from 'colyseus';
import * as admin from 'firebase-admin';
const key = require('../config/adminsdk.json');

import { GameRoom } from '../packages/server/GameRoom';
import { TutorialRoom } from '../packages/server/TutorialRoom';

require('../packages/client/config/env');


const fs = require('fs');
const chalk = require('react-dev-utils/chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../packages/client/config/paths.js');
const configFactory = require('../packages/client/config/webpack.config.js');
const createDevServerConfig = require('../packages/client/config/webpackDevServer.config.js');

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const config = configFactory('development');
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const appName = require(paths.appPackageJson).name;

const urls = prepareUrls(
  protocol,
  '0.0.0.0',
  1337,
  paths.publicUrlOrPath.slice(0, -1)
);

const devSocket = {
  warnings: warnings =>
    devServer.sockWrite(devServer.sockets, 'warnings', warnings),
  errors: errors =>
    devServer.sockWrite(devServer.sockets, 'errors', errors),
};

const compiler = createCompiler({
  appName,
  config,
  devSocket,
  urls,
  useYarn: true,
  useTypeScript: true,
  tscCompileOnError: true,
  webpack,
});

const proxySetting = require(paths.appPackageJson).proxy;

const proxyConfig = prepareProxy(
  proxySetting,
  paths.appPublic,
  paths.publicUrlOrPath
);
const serverConfig = createDevServerConfig(
  proxyConfig,
  urls.lanUrlForConfig
);

const devServer = new wpmiddleware(compiler, serverConfig);

let app = express();
app.use(express.json());
app.use(devServer);

admin.initializeApp();

const server = new Server({
  server: createServer(app)
});

server.define("game", GameRoom);
server.define("tutorial", TutorialRoom);

server.listen(8080);