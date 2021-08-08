import React from 'react';
import { Center } from '../components/center';
import { Box } from '../components/box';
import { Space } from '../components/space';
import { Button } from '../components/button';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { navigate } from '@reach/router';
import DOMPurify from 'dompurify';

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
//           <h1 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 'bold' }}>DragonCoin</h1>
//         </Box>
//         <Space size='m' />
//         <b>Now, you'll need to pick a Dragon Name. Your first name is a sensible choice.</b>
//         <p>Remember to choose something people can't use to find you in real life.</p>
//         <Space size='m' />
//         <input type="text" placeholder="Dragon Name" style={{ fontSize: '20px', color: "white", backgroundColor: 'transparent', padding: '3px', border: '3px solid #c60c30', width:'45%' }} />
//         <Button text="Confirm" style={{ width:'40%' }} onClick={processUser} />
//       </Center>
//     </>
//   );
// }

const VideoCutscene = () => {
  return (
    <></>
  );
}


export default VideoCutscene;