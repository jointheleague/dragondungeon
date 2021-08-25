import React, {useEffect, useState} from 'react';
import { Box, Space, Button } from '../components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore/lite';
import { navigate } from '@reach/router';

const db = getFirestore();
const auth = getAuth();

const MyDragon = () => {
  const [profilePicture, setProfilePicture] = useState<string>('/icon.png');
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [userStats, setUserStats] = useState<any>({});
  const [userGameplay, setUserGameplay] = useState<any>({});
  useEffect(() => {
    const myDragonAudio = new Audio('/music/mydragon.mp3');
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
  }, []);
  return (
    <>
      { pageLoaded &&
        <div id="mydragon">
          <Box>
            <h1 style={{
              fontSize: '40px',
            }}>
              <img src={profilePicture} style={{
                height: '40px',
                verticalAlign: 'middle',
              }} />&nbsp;&nbsp;
              {currentUser.displayName}
            </h1>
          </Box>
          <div style={{ float: 'right', paddingLeft: '50px' }} id="sidebar">
            <Button onClick={() => navigate('/play/random')} text="Play" />
            <Button onClick={() => navigate('/')} text="Home" />
            <Space size="m" />
            {/* <Button onClick={() => navigate('/settings')} text="Settings" /> */}
            <Button onClick={() => navigate('/credits')} text="Credits" />
          </div>
          <Space size="xl" />
          <img id="skin" src={`/${userGameplay.dragonSkin}Dragon.png`} style={{ imageRendering: 'pixelated', float: 'right' }} alt="Profile" height="350px"/>
          <div style={{ float: 'left' }}>
          <Space size="xl" />
            <h2 style={{ fontSize: '40px' }}>Level <big style={{ fontSize: '50px' }}>{userStats.level}</big> <span id="profession">{userGameplay.ballType ? userGameplay.ballType.charAt(0).toUpperCase() + userGameplay.ballType.slice(1) : ''}</span> Dragon</h2>
            <BallDisplay ballType="fire" uid={currentUser.uid} />
            <BallDisplay ballType="electric" uid={currentUser.uid} />
            <BallDisplay ballType="ice" uid={currentUser.uid} />
            <BallDisplay ballType="poison" uid={currentUser.uid} />
            <BallDisplay ballType="mud" uid={currentUser.uid} />
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
      <img src={`/${props.ballType}ball.png`} style={{ cursor: 'pointer', imageRendering: 'pixelated', padding: '10px' }} height="50px"  onClick={() => {
        var gameplayDoc = doc(db, props.uid, "gameplay");
        setDoc(gameplayDoc, {
          ballType: props.ballType,
        }, { merge: true });
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