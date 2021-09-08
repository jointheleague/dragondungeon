import React, {useEffect, useState} from 'react';
import { Box, Space, Button } from '../components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore/lite';
import { navigate } from '@reach/router';

const db = getFirestore();
const auth = getAuth();
const myDragonAudio = new Audio('/music/mydragon.mp3');
const MyDragon = () => {
  const [profilePicture, setProfilePicture] = useState<string>('/icon.png');
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [userStats, setUserStats] = useState<any>({});
  const [userGameplay, setUserGameplay] = useState<any>({});
  useEffect(() => {
   
    myDragonAudio.loop = true;
    myDragonAudio.play();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.photoURL) {
          setProfilePicture(user.photoURL);
        }
        setCurrentUser(user);

        const stats = await getDoc(doc(db, user.uid, "stats"));
        const gameplay = await getDoc(doc(db, user.uid, "gameplay"));
        setUserStats(stats.data() || {});
        setUserGameplay(gameplay.data() || {});

        setPageLoaded(true);
      } else {
        navigate('/');
      }
    });

    return () => {
      myDragonAudio.pause();
    };
  }, []);
  return (
    <>
      { pageLoaded &&
        <div id="mydragon">
          <Box>
            <h1 style={{
                fontSize: '50px',
                color: 'white',
              }}>
              <img src={profilePicture} style={{
                height: '90px',
                verticalAlign: 'middle',
              }} />&nbsp;&nbsp;
              {currentUser.displayName}
            </h1>
          </Box>
          <div id="balltype-det" style={{ display: 'none', position: 'fixed', bottom: 0, left: 0, padding: '20px', margin: '20px', background: 'black', color: 'white', border: '3px solid #c60c30', borderRadius: '25px' }}>
            <h1 id="balltype-det-name">Fireball</h1>
            <p id="balltype-det-desc">Test Text</p>
          </div>
          <div style={{ float: 'right', paddingLeft: '50px' }} id="sidebar">
            <Button onClick={() => navigate('/play/random')} text="Play" />
            <Button onClick={() => navigate('/credits')} text="Credits" />
          </div>
          <Space size="l" />
          <img id="skin" src={`/${userGameplay.dragonSkin}Dragon.png`} style={{ imageRendering: 'pixelated', float: 'right', paddingRight: '40px' }} alt="Profile" height="350px"/>
          <div style={{ float: 'left' }}>
          <Space size="l" />
            <h2 style={{ fontSize: '40px' }}>Level <big style={{ fontSize: '50px' }}>{userStats.level}</big> <span id="profession">{userGameplay.ballType ? userGameplay.ballType.charAt(0).toUpperCase() + userGameplay.ballType.slice(1) : ''}</span> Dragon</h2>
            <BallDisplay ballType="fire" uid={currentUser.uid} desc="The basic fireball just pushes players away and causes them to lose coins." />
            <BallDisplay ballType="electric" uid={currentUser.uid} desc="The electric ball has a possibility of generating a new electric ball on contact with another dragon." />
            <BallDisplay ballType="ice" uid={currentUser.uid} desc="The ice ball will decrease the speed of a dragon temporarily on contact." />
            <BallDisplay ballType="poison" uid={currentUser.uid} desc="The poison ball transports those lost coins directly into the bar of the dragon who shot the fireball." />
            <BallDisplay ballType="mud" uid={currentUser.uid} desc="The mud ball will increase in size on contact with another dragon." />
            <Space size="m" />
            <SkinDisplay skin="basic" uid={currentUser.uid} />
            <SkinDisplay skin="light" uid={currentUser.uid} />
            <SkinDisplay skin="gold" uid={currentUser.uid} />
          </div>
        </div>
      }
    </>
  );
}

const BallDisplay = (props: any) => {
  return (
    <>
      <img src={`/${props.ballType}ball.png`} style={{ cursor: 'pointer', imageRendering: 'pixelated', padding: '10px' }} height="80px"
      onMouseOver={() => {
        (document.getElementById('balltype-det') as any).style.display = 'block';
        (document.getElementById('balltype-det-name') as any).innerText = props.ballType.toUpperCase();
        (document.getElementById('balltype-det-desc') as any).innerText = props.desc;
      }}
      onMouseOut={() => {
        (document.getElementById('balltype-det') as any).style.display = 'none';
        (document.getElementById('balltype-det-name') as any).innerText = props.ballType.toUpperCase();
        (document.getElementById('balltype-det-desc') as any).innerText = props.desc;
      }}
      onClick={() => {
        var gameplayDoc = doc(db, props.uid, "gameplay");
        setDoc(gameplayDoc, {
          ballType: props.ballType,
        }, { merge: true });
        switch (props.ballType) {
          case "fire":
            (document.body as any).style.background = "linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url('/background-tile.png')";
            break;
          case "electric":
            (document.body as any).style.background = "linear-gradient( rgba(255, 186, 0, 0.1), rgba(255, 186, 0, 0.1) ), url('/background-tile.png')";
            break;
          case "ice":
            (document.body as any).style.background = "linear-gradient( rgba(21, 0, 255, 0.1), rgba(21, 0, 255, 0.1) ), url('/background-tile.png')";
            break;
          case "poison":
            (document.body as any).style.background = "linear-gradient( rgba(60, 110, 26, 0.3), rgba(60, 110, 26, 0.3) ), url('/background-tile.png')";
            break;
          case "mud":
            (document.body as any).style.background = "linear-gradient( rgba(110, 74, 26, 0.4), rgba(110, 74, 26, 0.4) ), url('/background-tile.png')";
            break;
          default:
            break;
        }
        document.querySelector("#profession")!.innerHTML = props.ballType.charAt(0).toUpperCase() + props.ballType.slice(1);
      }}/>
    </>
  );
};

const SkinDisplay = (props: any) => {
  return (
    <>
      <img src={`/${props.skin}Dragon.png`} style={{ cursor: 'pointer', imageRendering: 'pixelated', padding: '10px' }} height="50px"  onClick={() => {
        var gameplayDoc = doc(db, props.uid, "gameplay");
        setDoc(gameplayDoc, {
          dragonSkin: props.skin,
        }, { merge: true });
        (document.querySelector("#skin")! as HTMLImageElement).src = `/${props.skin}Dragon.png`;
      }}/>
    </>
  );
};

export default MyDragon;