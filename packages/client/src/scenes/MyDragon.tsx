import React, {useEffect, useState} from 'react';
import { Box, Space, Center, Button } from '../components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore/lite';
import { navigate } from '@reach/router';
import DOMPurify from 'dompurify';

const db = getFirestore();
const auth = getAuth();

const MyDragon = () => {
  const [profilePicture, setProfilePicture] = useState<string>('/icon.png');
  const [currentUser, setCurrentUser] = useState<any>({});
  const [userStats, setUserStats] = useState<any>({});
  const [userGameplay, setUserGameplay] = useState<any>({});
  useEffect(() => {
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
      } else {
        navigate('/');
      }
    });
  }, []);
  return (
    <>
      <br /><br /><br />
      <Center>
        <h1 style={{ fontSize: '60px' }}>
          {DOMPurify.sanitize(currentUser.displayName) ? DOMPurify.sanitize(currentUser.displayName) : '...'}
        </h1>
        <img id="skin" src={`/${userGameplay.dragonSkin}Dragon.png`} style={{ imageRendering: 'pixelated'}} alt="Profile" height="150px"/>
        <h2>level <big>{userStats.level}</big> <span id="profession">{userGameplay.ballType}</span> dragon</h2>
        <br /><br /><br />

        <table>
          <tr>
            <BallDisplay ballType="fire" uid={currentUser.uid} />
            <BallDisplay ballType="electric" uid={currentUser.uid} />
            <BallDisplay ballType="ice" uid={currentUser.uid} />
            <BallDisplay ballType="poison" uid={currentUser.uid} />
            <BallDisplay ballType="mud" uid={currentUser.uid} />
          </tr>
        </table>

        <br />

        <table>
          <tr>
            <SkinDisplay skin="basic" uid={currentUser.uid} />
            <SkinDisplay skin="light" uid={currentUser.uid} />
            <SkinDisplay skin="gold" uid={currentUser.uid} />
          </tr>
        </table>
      </Center>
        <Space size='xl'/>
    </>
  );
}

const BallDisplay = (props: any) => {
  return (
    <td>
      <img src={`/${props.ballType}ball.png`} style={{ cursor: 'pointer', imageRendering: 'pixelated' }} height="50px"  onClick={() => {
        var gameplayDoc = doc(db, props.uid, "gameplay");
        setDoc(gameplayDoc, {
          ballType: props.ballType,
        }, { merge: true });
        document.querySelector("#profession")!.innerHTML = props.ballType;
      }}/>
    </td>
  );
};

const SkinDisplay = (props: any) => {
  return (
    <td>
      <img src={`/${props.skin}Dragon.png`} style={{ cursor: 'pointer', imageRendering: 'pixelated' }} height="50px"  onClick={() => {
        var gameplayDoc = doc(db, props.uid, "gameplay");
        setDoc(gameplayDoc, {
          dragonSkin: props.skin,
        }, { merge: true });
        (document.querySelector("#skin")! as HTMLImageElement).src = `/${props.skin}Dragon.png`;
      }}/>
    </td>
  );
};

export default MyDragon;