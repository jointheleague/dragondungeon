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
            <td>
              <img src="/fireball.png" style={{ cursor: 'pointer', imageRendering: 'pixelated'}} height="50px" alt="Fireball" onClick={() => {
                var gameplayDoc = doc(db, currentUser.uid, "gameplay");
                setDoc(gameplayDoc, {
                  ballType: "fire",
                }, { merge: true });
                document.querySelector("#profession")!.innerHTML = 'Fire';
              }} />
            </td>
            <td>
              <img src="/iceball.png" style={{ cursor: 'pointer', imageRendering: 'pixelated' }} height="50px" alt="Fireball" onClick={() => {
                var gameplayDoc = doc(db, currentUser.uid, "gameplay");
                setDoc(gameplayDoc, {
                  ballType: "ice",
                }, { merge: true });
                document.querySelector("#profession")!.innerHTML = 'Ice';
              }} />
            </td>
            <td>
              <img src="/electricball.png" style={{ cursor: 'pointer', imageRendering: 'pixelated' }} height="50px" alt="Fireball" onClick={() => {
                var gameplayDoc = doc(db, currentUser.uid, "gameplay");
                setDoc(gameplayDoc, {
                  ballType: "electric",
                }, { merge: true });
                document.querySelector("#profession")!.innerHTML = 'Electric';
              }} />
            </td>
            <td>
              <img src="/poisonball.png" style={{ cursor: 'pointer', imageRendering: 'pixelated' }} height="50px" alt="Fireball" onClick={() => {
                var gameplayDoc = doc(db, currentUser.uid, "gameplay");
                setDoc(gameplayDoc, {
                  ballType: "poison",
                }, { merge: true });
                document.querySelector("#profession")!.innerHTML = 'Poison';
              }} />
            </td>
            <td>
              <img src="/mudball.png" style={{ cursor: 'pointer', imageRendering: 'pixelated' }} height="50px" alt="Fireball"  onClick={() => {
                var gameplayDoc = doc(db, currentUser.uid, "gameplay");
                setDoc(gameplayDoc, {
                  ballType: "mud",
                }, { merge: true });
                document.querySelector("#profession")!.innerHTML = 'Mud';
              }}/>
            </td>
          </tr>
        </table>

        <br />

        <table>
          <tr>
          <td>
              <img src="/lightDragon.png" style={{ cursor: 'pointer', imageRendering: 'pixelated' }} height="50px" alt="Light Dragon" onClick={() => {
                var gameplayDoc = doc(db, currentUser.uid, "gameplay");
                setDoc(gameplayDoc, {
                  dragonSkin: "light",
                }, { merge: true });
                (document.querySelector("#skin")! as HTMLImageElement).src = '/lightDragon.png';
              }}/>
            </td>
            <td>
              <img src="/goldDragon.png" style={{ cursor: 'pointer', imageRendering: 'pixelated' }} height="50px" alt="Golden Dragon" onClick={() => {
                var gameplayDoc = doc(db, currentUser.uid, "gameplay");
                setDoc(gameplayDoc, {
                  dragonSkin: "gold",
                }, { merge: true });
                (document.querySelector("#skin")! as HTMLImageElement).src = '/goldDragon.png';
              }}/>
            </td>
            <td>
              <img src="/basicDragon.png" style={{ cursor: 'pointer', imageRendering: 'pixelated' }} height="50px" alt="Basic Dragon" onClick={() => {
                var gameplayDoc = doc(db, currentUser.uid, "gameplay");
                setDoc(gameplayDoc, {
                  dragonSkin: "basic",
                }, { merge: true });
                (document.querySelector("#skin")! as HTMLImageElement).src = '/basicDragon.png';
              }}/>
            </td>
          </tr>
        </table>
      </Center>
        <Space size='xl'/>
    </>
  );
}

export default MyDragon;