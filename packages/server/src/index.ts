import * as express from 'express';
import { createServer } from 'http';
import { Server } from 'colyseus';
import {GameRoom} from './rooms/GameRoom';

function findPort(): number {
  return 8001;
}

const app = express();
app.use(express.json());

const server = new Server({
  server: createServer(app),
  express: app
})

server
  .define("game", GameRoom)


const PORT = findPort();
server.listen(PORT);
console.log(`Listening on ws://localhost:${PORT}`);
