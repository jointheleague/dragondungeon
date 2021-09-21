import React from 'react';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { navigate } from '@reach/router';
import DOMPurify from 'dompurify';
import { Button } from 'components';

const db = getFirestore();
const auth = getAuth();

const processUser = () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      const selectedName:string = document.querySelector('input')?.value || '';

      if (DOMPurify.sanitize(selectedName) !== '') {

        updateProfile(user, {
          displayName: DOMPurify.sanitize(selectedName)
        });

        setDoc(doc(db, user.uid, "login"), {
          hasPickedIGN: true,
        }).then(() => {
          navigate('/play/random');
        });
      }
    }
  });
}

// const NewUser = () => {
//   return (
//     <>
//       <br /><br /><br />
//       <Center>
//         <Space size='xl' />
//         <Box>
//           <h1 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}>Dragon Dungeon</h1>
//         </Box>
//         <Space size='m' />
//         <b>Now, you'll need to pick a Dragon Name. Your first name is a sensible choice.</b>
//         <p>Remember to choose something people can't use to find you in real life.</p>
//         <Space size='m' />
//         <input type="text" placeholder="Dragon Name" style={{ fontSize: '20px', color: "white", backgroundColor: 'transparent', padding: '3px', border: '3px solid red', width:'45%' }} />
//         <Button text="Confirm" style={{ width:'40%' }} onClick={processUser} />
//       </Center>
//     </>
//   );
// }

const StoryContent = () => {
  return (
    <>
      <iframe src="https://www.arcgis.com/apps/Cascade/index.html?appid=75cd545ddeb949629b6494f8228adcd0&classicEmbedMode" style={{
        border: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }} />
      <Button onClick={ () => {
        navigate('/tutorial');
      }} text="Continue" style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
      }} />
    </>
  );
}


export default StoryContent;