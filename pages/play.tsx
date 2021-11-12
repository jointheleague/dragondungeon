import React, { Component, ReactNode } from 'react'

import { StateManager } from '../app/state/StateManager'
import { CoreView } from '../app/view/CoreView'
import { ColyseusService } from '../lib/colyseus'

export default async function Game() {
    let stateManager = new StateManager(new ColyseusService('ws', 'localhost:1337'), 'new')
    await stateManager.setup()
    return <CoreView stateManager={stateManager}/>
}
