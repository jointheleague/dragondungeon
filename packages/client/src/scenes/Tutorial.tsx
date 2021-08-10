import React, {useEffect, useState} from 'react';
import { Box, Space, Center, Button } from '../components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc, limit } from 'firebase/firestore/lite';
import { navigate } from '@reach/router';
import DOMPurify from 'dompurify';

const Info = () => {
  return (
    <>
      <br /><br /><br />
      <Center>
        <a href="/">Back</a>
        <Space size='l'/>
        <Box>
          <h1 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}>Info</h1>
        </Box>
        <Space size='l'/>
        <div style={{
          backgroundColor: '#737373',
          color: 'white',
          borderRadius: '5px',
          width: '20vw',
          padding: '10px',
          display: 'flex',
          flexDirection: 'row'
        }}>
          <img src="/lightDragon.png" style={{ imageRendering: 'pixelated' }} height="60px" alt="Dragon" />
          <br />
          <h4 style={{ paddingLeft: '30px', alignSelf: 'center' }}>Controls</h4>
        </div>
        <br />
        <p style={{textAlign:'center'}}>
        Move using, W A S D
        <br/>Shoot fireballs with the SPACEBAR 
        <br/>To continiously shoot fireballs, hold SPACEBAR or press the X key</p>
        <br />
        <div style={{
          backgroundColor: '#737373',
          color: 'white',
          borderRadius: '5px',
          width: '20vw',
          padding: '10px',
          display: 'flex',
          flexDirection: 'row'
        }}>
          <img src="/Icon.png" style={{ imageRendering: 'pixelated', paddingTop: '10px' }} height="40px" alt="Coin" />
          <br />
          <h4 style={{ paddingLeft: '30px', alignSelf: 'center' }}>Coins</h4>
        </div>
        <br />
        <p style={{textAlign:'center'}}> Collecting coins is how you increase your Score, differently sized coins are worth different ammounts,
        <br /> At first the coins are added to a bar above the dragon 
        <br /> Then when the dragon gets close to the coin jar (shown below) they are deposited and added to your total score
         </p>
        <br />
        <div style={{
          backgroundColor: '#737373',
          color: 'white',
          borderRadius: '5px',
          width: '20vw',
          padding: '10px',
          display: 'flex',
          flexDirection: 'row'
        }}>
          <img src="/coinJar.png" style={{ imageRendering: 'pixelated' }} height="60px" alt="Coin Jar" />
          <br />
          <h4 style={{ paddingLeft: '30px', alignSelf: 'center' }}>Goal</h4>
        </div>
        <br />
        <p style={{textAlign:'center'}}>The goal of the game is to pick up coins and bring them back to the coin jar in the center <br/> (shown above)</p>
        <br />
        <div style={{
          backgroundColor: '#737373',
          color: 'white',
          borderRadius: '5px',
          width: '20vw',
          padding: '10px',
          display: 'flex',
          flexDirection: 'row'
        }}>
          <img src="/Fireball.png" style={{ imageRendering: 'pixelated' }} height="60px" alt="Fireball" />
          <br />
          <h4 style={{ paddingLeft: '30px', alignSelf: 'center' }}>Fireballs</h4>
        </div>
        <br />
        <p style={{textAlign:'center'}}>Fireballs are how you interact with other players and try to prevent them from caching coins
        <br /><br /> different fireballs have different effects</p>
        <ul style={{paddingLeft:'80px'}}>
          <li style={{paddingBottom:'10px'}}>The basic fireball just pushes players away and causes them to lose coins</li>
          <li style={{paddingBottom:'10px'}}>The poison ball transports those lost coins directly into the bar of the dragon who shot the fireball</li>
          <li style={{paddingBottom:'10px'}}>The electric ball has a possibility of generating a new electric ball on contact with another dragon</li>
          <li style={{paddingBottom:'10px'}}>The mud ball will increase in size on contact with another dragon</li>
          <li>The ice ball will decrease the speed of a dragon temporarily on contact</li>
        </ul>
        <br />
        <div style={{
          backgroundColor: '#737373',
          color: 'white',
          borderRadius: '5px',
          width: '20vw',
          padding: '10px',
          display: 'flex',
          flexDirection: 'row'
        }}>
          <img src="/Bat.png" style={{ imageRendering: 'pixelated', paddingTop: '10px' }} height="40px" alt="Coin" />
          <br />
          <h4 style={{ paddingLeft: '30px', alignSelf: 'center' }}>Bats</h4>
        </div>
        <br />
        <p style={{textAlign:'center'}}> Bats slow down a player's movement and firespeed on contact </p>
        <br />
        <div style={{
          backgroundColor: '#737373',
          color: 'white',
          borderRadius: '5px',
          width: '20vw',
          padding: '10px',
          display: 'flex',
          flexDirection: 'row'
        }}>
          <img src="/Skull.png" style={{ imageRendering: 'pixelated', paddingTop: '10px' }} height="40px" alt="Coin" />
          <br />
          <h4 style={{ paddingLeft: '30px', alignSelf: 'center' }}>Skulls</h4>
        </div>
        <br />
        <p style={{textAlign:'center'}}> Skulls cause a player to drop coins on contact </p>

      </Center>
        <Space size='xl'/>
    </>
  );
}

export default Info;