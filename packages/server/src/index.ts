import * as express from 'express';
import * as fs from 'fs';
import { createServer as createServerTLS } from 'https';
import { createServer } from 'http';
import { Server } from 'colyseus';
import { GameRoom } from './rooms/GameRoom';
import { TutorialRoom } from './rooms/TutorialRoom';
import * as admin from 'firebase-admin';

const colyseusMonitor = require('@colyseus/monitor');

const admin_sdk_key = require('../top_secret/adminsdk.json');

function findPort(): number {
  return 8001;
}

admin.initializeApp({
	credential: admin.credential.cert(admin_sdk_key)
});

const app = express();
app.use(express.json());
app.use('/', colyseusMonitor.monitor());

if (fs.existsSync('../../key.pem')) {
  const server = new Server({
    server: createServerTLS({
      key:  fs.readFileSync('../../key.pem'),
      cert: fs.readFileSync('../../cert.pem'),
    }, app),
    express: app
  });
  server.define("game", GameRoom);
  server.define("tutorial", TutorialRoom);
  const PORT = findPort();
  server.listen(PORT);
  console.log(`ws://localhost:${PORT}`);
} else {
  const server = new Server({
    server: createServer(app),
    express: app
  });
  server.define("game", GameRoom);
  server.define("tutorial", TutorialRoom);
  const PORT = findPort();
  server.listen(PORT);
  console.log(`ws://localhost:${PORT}`);
}
