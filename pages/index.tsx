import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import { initializeApp } from 'firebase/app'

import '../styles/Home.module.css'

export default function Home() {
  let router = useRouter()
  return (
    <div id='home'>
      <h1>DRAGON DUNGEON</h1>
      <button onClick={() => {
        initializeApp({
          apiKey: "AIzaSyCRClPzTZnRSg_fAap6ENnAkxUBQKJGk5w",
          authDomain: "leaguedragoncoin.firebaseapp.com",
          projectId: "leaguedragoncoin",
          storageBucket: "leaguedragoncoin.appspot.com",
          messagingSenderId: "320692217416",
          appId: "1:320692217416:web:f9cd0efdc04445865e9a7d"
        })
        let auth = getAuth()
        onAuthStateChanged(auth, async user => {
          if (user) {
            router.push('/play')
          } else {
            let info = await signInWithPopup(auth, new GoogleAuthProvider())
            info.user ? router.push('/play') : alert('There was an issue signing in.')
          }
        })
      }}>Play</button>
    </div>
  )
}
