// DragonDungeon Core

// 3rd Party Imports
import { createServer } from 'http'
import { parse } from 'url'
import { Server } from 'colyseus'
import { monitor } from '@colyseus/monitor'
import { WebSocketTransport } from '@colyseus/ws-transport'
import next from 'next'
import express from 'express'
import 'colors'

// 1st Party Imports
import { GameRoom } from './GameRoom'

// Friendly Logs
console.log('DragonDungeon'.red)
console.log('The LEAGUE of Amazing Programmers'.yellow)

// Initialize Next.js
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Start Client
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(8080, () => {
    console.log('client'.green + ' - localhost:8080')
  })
})

// Start Server
const exp = express()

exp.get('/*', monitor())

const gameServer = new Server({
  transport: new WebSocketTransport({
    server: createServer(exp)
  })
})

gameServer.define('game', GameRoom)

gameServer.listen(1337)
console.log('server'.green + ' - localhost:1337')