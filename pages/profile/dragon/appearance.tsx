import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore/lite'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import styles from 'styles/index.module.css'

function MenuOption(props) {
  let router = useRouter()
  return <div className={styles.link} onClick={() => router.push(props.href)}>{props.name}</div>
}

function MenuOptionSkin(props) {
  return <div className={styles.link} onClick={() => setSkin(props.name.toLowerCase() + 'Dragon', props.user)} onMouseEnter={() => previewSkin(props.name.toLowerCase() + 'Dragon')}>{props.name}</div>
}

async function setSkin(skin, user) {
  let db = getFirestore()
  let userInfoRef = doc(db, user, 'gameplay')
  await setDoc(userInfoRef, { dragonSkin: skin.replace('Dragon', '') }, { merge: true })
}

function previewSkin(skin) {
  (document.querySelector('#skinhero') as HTMLImageElement).src = `/img/dragons/${skin}.png`
}
 
export default function Appearance() {
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
        <h1>Appearance</h1>
        <img src="/img/dragons/basicDragon.png" id="skinhero" className={styles.heroImage} />
      </div>
      <MenuOption name="&larr;" href="/profile/dragon" />
      <MenuOptionSkin name="Basic"  user={user.uid} />
      <MenuOptionSkin name="Gold" user={user.uid} />
      <MenuOptionSkin name="Light" user={user.uid} />
    </div>
  )
}
