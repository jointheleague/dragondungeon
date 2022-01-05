import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore/lite'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import styles from 'styles/index.module.css'

function MenuOption(props) {
  let router = useRouter()
  return <div className={styles.link} onClick={() => router.push(props.href)}>{props.name}</div>
}

function MenuOptionBallType(props) {
    let router = useRouter()
    return <div className={styles.link} onClick={() => setBallType(props.name.toLowerCase(), props.user)} onMouseEnter={() => previewBallType(props.name.toLowerCase())}>{props.name}</div>
}

async function setBallType(ball, user) {
    let db = getFirestore()
    let userInfoRef = doc(db, user, 'gameplay')
    await setDoc(userInfoRef, { ballType: ball.replace('ball', '') }, { merge: true })
}

function previewBallType(ball) {
    (document.querySelector('#ballhero') as HTMLImageElement).src = `/img/abilities/${ball}.png`
}

export default function Abilities() {
  let [ user, setUser ] = useState<any>('')

  useMemo(() => {
    let auth = getAuth()
    let authUnsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      }
    })
  
    authUnsub()
  }, [])

  return (
    <div className={styles.home}>
      <div style={{ padding: '20px' }}>
        <h1>Abilities</h1>
        <img src="/img/abilities/fireball.png" id="ballhero" className={styles.heroImage} />
      </div>
      <MenuOption name="&larr;" href="/profile/dragon" />
      <MenuOptionBallType name="Fireball"  user={user.uid} />
      <MenuOptionBallType name="Electricball" user={user.uid} />
      <MenuOptionBallType name="Iceball" user={user.uid} />
      <MenuOptionBallType name="Mudball" user={user.uid} />
      <MenuOptionBallType name="Poisonball" user={user.uid} />
    </div>
  )
}
