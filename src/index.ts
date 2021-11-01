import express from 'express';
import colors from 'colors';

import { createServer } from 'http';
import { Server } from 'colyseus';

import { initializeApp } from 'firebase-admin';
const key = require('../config/adminsdk.json');

import { GameRoom } from '../packages/server/GameRoom';
import { TutorialRoom } from '../packages/server/TutorialRoom';

let app = express();
app.use(express.json());

initializeApp();

const server = new Server({
  server: createServer(app)
});

server.define("game", GameRoom);
server.define("tutorial", TutorialRoom);

server.listen(8080);