import React, { Component, ReactNode, useState, useEffect } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { Box, Button, Line, Input } from '../components';
import {Space} from '../components/space';
import {Center} from '../components/center';
import {ColyseusService} from '../services/colyseus';

interface IProps extends RouteComponentProps {
  colyseus: ColyseusService
}

interface IState {
  chosenRoom: string;
}

const RoomOptions = (props: {}) => {
  const [room, setRoom] = useState("");
  return (<Box>
    <Input
      ariaLabel="Room ID"
      value={room}
      style={{maxWidth: '300px'}}
      placeholder="Room ID"
      onChange={v => setRoom((v.target as HTMLInputElement).value)}
      ></Input>
    <Space size='xs'/>
    <Button disabled={room === ""} onClick={() => navigate("/play/"+room)} text="Join +"></Button>
    <Line/>
    <Button onClick={() => navigate("/play/random")} text="Random + "></Button>
  </Box>)
}

const CharacterCustomization = () => {
  const [name, setName] = useState(localStorage.getItem("name") || "");

  useEffect(() => localStorage.setItem("name", name), [name]);

  return (<Box>
    <Input
      ariaLabel="name"
      value={name}
      placeholder="Name"
      onChange={e => setName((e.target as HTMLInputElement).value)}
      ></Input>
  </Box>)
}

export default class Game extends Component<IProps, IState> {
  render(): ReactNode {
    return <>
      <Center>
      <Space size='s'/>
      <Box>
        <h1 style={{ textAlign: 'center' }}>Home</h1>
      </Box>

      <Space size='s'/>
      <CharacterCustomization/>

      <Space size='s'/>
      <RoomOptions/>
      </Center>
    </>
  }
}
