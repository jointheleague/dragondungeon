# Dragon Dungeon

## About

Dragon Dungeon is a free-to-play game from the LEAGUE of Amazing Programmers. This branch (main) contains the latest code of Dragon Dungeon 1.0.0 (November 2021) onwards. The legacy branch contains Dragon Dungeon code from versions 0.0.1 - 1.0.0 (December 2020 - October 2021). The legacy branch is intended as a historical record - not a functioning game. It is no longer supported and has known bugs.

## Configuration

The config folder is **required** and may contain some or all of the following files:

* dragondungeon.yaml: Game config file (*required*)
* private/adminsdk.json: Firebase Admin SDK Key (*required*)
* private/key.pem: Private keyfile for SSL (*recommended*)
* private/cert.pem: Certificate for SSL (*recommended*)

## Code Structure

* app: client-side game logic, graphics rendering
* common: resources used by both client and server
* components: React components for frontend interface
* config: server configuration files
* lib: libraries and services
* pages: frontend menu code
* public: assets and essential files
* server: Colyseus rooms and game logic
* styles: frontend CSS styling

## Development Configuration

Coming Soon...