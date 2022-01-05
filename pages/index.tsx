import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { initializeApp } from 'firebase/app'

import '../styles/Home.module.css'

export default function Home() {
  let router = useRouter()
  return (
    <div id="home">
      <h1>DRAGON DUNGEON</h1>
      <button
        onClick={() => {
          initializeApp({
            apiKey: 'AIzaSyCRClPzTZnRSg_fAap6ENnAkxUBQKJGk5w',
            authDomain: 'leaguedragoncoin.firebaseapp.com',
            projectId: 'leaguedragoncoin',
            storageBucket: 'leaguedragoncoin.appspot.com',
            messagingSenderId: '320692217416',
            appId: '1:320692217416:web:f9cd0efdc04445865e9a7d',
          })
          let auth = getAuth()
          let isSuccessfulSignIn = false

          let unsubAuthState = onAuthStateChanged(auth, async (user) => {
            if (user) {
              isSuccessfulSignIn = true
            } else {
              let info = await signInWithPopup(auth, new GoogleAuthProvider())
              info.user
                ? (isSuccessfulSignIn = true)
                : alert('There was an issue signing in.')
            }

            unsubAuthState()

            if (isSuccessfulSignIn) {
              router.push('/play')
            }
          })
        }}
      >
        Play
      </button>
    </div>
  )
}
