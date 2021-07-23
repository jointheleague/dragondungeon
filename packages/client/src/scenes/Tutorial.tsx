import React, {useEffect, useState} from 'react';
import { Center } from '../components/center';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore/lite';
import { navigate } from '@reach/router';
import DOMPurify from 'dompurify';

const Tutorial = () => {
  return (
    <>
      <br /><br /><br />
      <Center>
      </Center>
    </>
  );
}

export default Tutorial;