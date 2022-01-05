import Head from 'next/head'
import { useMemo, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import '../styles/globals.css'

async function start(setGameStarted, setMusicStarted, musicStarted) {
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

    if (isSuccessfulSignIn) {  
      document.documentElement.requestFullscreen();
      (navigator as any).keyboard.lock()
  
      if(!musicStarted) {
        let music = new Audio('/music/gameover.mp3')
        music.loop = true
        music.play()
        setMusicStarted(true)
      }
  
      (document.querySelector('#league') as any).style.display = 'block'
      setGameStarted(true)
      setTimeout(() => {
        (document.querySelector('#league') as any).style.display = 'none'
      }, 3000)
    }
  })

  unsubAuthState()
}

function DragonDungeon({ Component, pageProps }) {
  let [ gameStarted, setGameStarted ] = useState<boolean>(false)
  let [ musicStarted, setMusicStarted ] = useState<boolean>(false)

  useMemo(() => {
    // TODO: Fully implement fullscreen
    // if (typeof document !== undefined) {
    //   document.addEventListener('fullscreenchange', exitHandler, false);
    //   document.addEventListener('mozfullscreenchange', exitHandler, false);
    //   document.addEventListener('MSFullscreenChange', exitHandler, false);
    //   document.addEventListener('webkitfullscreenchange', exitHandler, false);
    // }

    // function exitHandler() {
    //   if (document.fullscreenElement == null) {
    //     setGameStarted(false)
    //   }
    // }
  }, [])

  return <>
    <Head>
      <title>Dragon Dungeon</title>
      <link rel="icon" href="/img/game/coinJar.png" />
    </Head>
    <div id='league' style={{ display: 'none', position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', background: 'black', textAlign: 'center' }}>
      <img src="/img/ui/jtl.png" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%); }}' }} />
    </div>
    <p style={{ color: '#f9e300', fontFamily: 'Cinzel', position: 'fixed', bottom: '0', right: '0', fontSize: '13pt', padding: '10px', margin: '10px', border: '5px solid #f9e300', background: 'rgba(0, 0, 0, 0.8)' }}>Beta Build {require('package.json').version}</p>
    {gameStarted && <Component {...pageProps} />}
    {!gameStarted && <div id='menu' style={{ textAlign: 'center', margin: 'auto', padding: '70px 0' }}>
      <h1 style={{ fontSize: '35pt' }}>DRAGON DUNGEON</h1>
      <h2 style={{ fontSize: '20pt', color: 'white' }} onClick={() => start(setGameStarted, setMusicStarted, musicStarted)}>START</h2>
    </div>}
  </>
}

export default DragonDungeon
