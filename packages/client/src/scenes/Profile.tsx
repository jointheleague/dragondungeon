import React, {useEffect, useState} from 'react';
import { Center } from '../components/center';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore/lite';
import { navigate } from '@reach/router';
import DOMPurify from 'dompurify';

const db = getFirestore();
const auth = getAuth();

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState<string>('/icon.png');
  const [currentUser, setCurrentUser] = useState<any>({});
  const [userStats, setUserStats] = useState<any>({});
  useEffect(
    () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          if (user.photoURL) {
            setProfilePicture(user.photoURL);
          }
          setCurrentUser(user);
          // db.collection(user.uid).doc('stats').get().then((doc) => {
          //   if (doc.exists) {
          //     setUserStats(doc.data());
          //   } else {
          //     setUserStats({});
          //   }
          // });

          const stats = await getDoc(doc(db, user.uid, "stats"));
          setUserStats(stats || {});
        } else {
          navigate('/');
        }
      });
    }, []
  )
  return (
    <>
      <br /><br /><br />
      <Center>
        <a href="/">Back</a>
        <h1>Profile</h1>
        <img src={profilePicture} alt="Profile" height="50px"/>
        <h1>{DOMPurify.sanitize(currentUser.displayName) ? DOMPurify.sanitize(currentUser.displayName) : '...'}</h1>
        
        {userStats.highscore ? 
          <>
            <h3><img src="/icon.png" height="20px" alt="Coin" /> High Score: {userStats.highscore}</h3>
            <h3><img src="/icon.png" height="20px" alt="Coin" /> Lifetime Coins: {userStats.coins}</h3>
            <h3><img src="/icon.png" height="20px" alt="Coin" /> Damage Done: {userStats.damagedone}</h3>
            <h3><img src="/icon.png" height="20px" alt="Coin" /> Damage Taken: {userStats.damagetaken}</h3>
            <h3><img src="/icon.png" height="20px" alt="Coin" /> K/D (Damage Done/Taken) Ratio: {(userStats.damagedone / userStats.damagetaken).toFixed(2)}</h3>
            <h3><img src="/icon.png" height="20px" alt="Coin" /> Medals Earned: {userStats.medals}</h3>
          </>
        : <>
            <h3><img src="/icon.png" height="20px" alt="Coin" /> ...</h3>
            <h3><img src="/icon.png" height="20px" alt="Coin" /> ...</h3>
            <h3><img src="/icon.png" height="20px" alt="Coin" /> ...</h3>
            <h3><img src="/icon.png" height="20px" alt="Coin" /> ...</h3>
            <h3><img src="/icon.png" height="20px" alt="Coin" /> ...</h3>
            <h3><img src="/icon.png" height="20px" alt="Coin" /> ...</h3>
          </>}
          <br /><br /><br />
        <div style={{
          backgroundColor: '#c60c30',
          color: 'white',
          borderRadius: '5px',
          width: '20vw',
          padding: '10px',
          cursor: 'pointer'
        }}>
          <img src="/icon.png" style={{ cursor: 'pointer' }} height="20px" alt="Coin" />
          <br />
          <h4 style={{ cursor: 'pointer' }}>Fireballs</h4>
        </div><br />
        <div style={{
          backgroundColor: '#00a1de',
          color: 'white',
          borderRadius: '5px',
          width: '20vw',
          padding: '10px',
          cursor: 'pointer'
        }}>
          <img src="/icon.png" style={{ cursor: 'pointer' }} height="20px" alt="Coin" />
          <br />
          <h4 style={{ cursor: 'pointer' }}>Iceballs</h4>
        </div><br />
        <div style={{
          backgroundColor: '#f9e300',
          color: 'black',
          borderRadius: '5px',
          width: '20vw',
          padding: '10px',
          cursor: 'pointer'
        }}>
          <img src="/icon.png" style={{ cursor: 'pointer' }} height="20px" alt="Coin" />
          <br />
          <h4 style={{ cursor: 'pointer' }}>Electricballs</h4>
        </div><br />
        <div style={{
          backgroundColor: '#009b3a',
          color: 'white',
          borderRadius: '5px',
          width: '20vw',
          padding: '10px',
          cursor: 'pointer'
        }}>
          <img src="/icon.png" style={{ cursor: 'pointer' }} height="20px" alt="Coin" />
          <br />
          <h4 style={{ cursor: 'pointer' }}>Poisonballs</h4>
        </div><br />
        <div style={{
          backgroundColor: '#3d2904',
          color: 'white',
          borderRadius: '5px',
          width: '20vw',
          padding: '10px',
          cursor: 'pointer'
        }}>
          <img src="/icon.png" style={{ cursor: 'pointer' }} height="20px" alt="Coin" />
          <br />
          <h4 style={{ cursor: 'pointer' }}>Mudballs</h4>
        </div><br />
      </Center>
    </>
  );
}

export default Profile;