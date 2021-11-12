import { Client } from 'colyseus.js';

export class ColyseusService {
  client: Client;
  constructor(private readonly protocol: string,
    private readonly endpoint: string) {
    const path = protocol + '://' + endpoint;
    this.client = new Client(path);
  }
}
