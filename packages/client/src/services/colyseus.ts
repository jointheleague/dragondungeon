import { Client } from 'colyseus.js';
import log from 'loglevel';

export class ColyseusService {
  client: Client;
  constructor(private readonly protocol: string,
    private readonly endpoint: string,
    private readonly port: string) {
    const path = protocol + '://' + endpoint + (port ? ':' + port : '');
    log.info("Colyseus path:", path);
    this.client = new Client(path);
  }
}
