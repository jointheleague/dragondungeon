import * as express from 'express';
import * as fs from 'fs';
import { Server } from 'colyseus';
import { GameRoom } from './rooms/GameRoom';
import { TutorialRoom } from './rooms/TutorialRoom';
import * as admin from 'firebase-admin';

const colyseusMonitor = require('@colyseus/monitor');

const admin_sdk_key = require('../top_secret/adminsdk.json');

admin.initializeApp({
	credential: admin.credential.cert(admin_sdk_key)
});

// if (fs.existsSync('../../key.pem')) {
//   const server = new Server({
//     express: app
//   });
//   console.log(`ws://localhost:${PORT}`);
// } else {
//   const server = new Server({
//     express: app
//   });
//   server.define("game", GameRoom);
//   server.define("tutorial", TutorialRoom);
//   console.log(`ws://localhost:${PORT}`);
// }

const initializeServer = (express) => {

  let server = new Server({
    express,
  });

  server.define("game", GameRoom);
  server.define("tutorial", TutorialRoom);
};

export default initializeServer;