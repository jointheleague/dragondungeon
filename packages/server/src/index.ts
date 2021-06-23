import * as express from 'express';
import * as fs from 'fs';
import { createServer as createServerTLS } from 'https';
import { createServer } from 'http';
import { Server } from 'colyseus';
import { GameRoom } from './rooms/GameRoom';

function findPort(): number {
  return 8001;
}

const app = express();
app.use(express.json());

if (fs.existsSync('../../key.pem')) {
  const server = new Server({
    server: createServerTLS({
      key:  fs.readFileSync('../../key.pem'),
      cert: fs.readFileSync('../../cert.pem'),
    }, app),
    express: app
  });
  server.define("game", GameRoom);
  const PORT = findPort();
  server.listen(PORT);
  console.log(`ws://localhost:${PORT}`);
} else {
  const server = new Server({
    server: createServer(app),
    express: app
  });
  server.define("game", GameRoom);
  const PORT = findPort();
  server.listen(PORT);
  console.log(`ws://localhost:${PORT}`);
}
