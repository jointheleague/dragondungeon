import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import styles from 'styles/index.module.css'

function MenuOption(props) {
  let router = useRouter()
  return <div className={styles.link} onClick={() => router.push(props.href)}>{props.name}</div>
}

function MenuOptionCB(props) {
  return <div className={styles.link} onClick={props.callback}>{props.name}</div>
}

export default function Social() {
  let [ user, setUser ] = useState<any>('')
  let [ dname, setDname ] = useState<string>('dragon0000')

  useMemo(() => {
    let auth = getAuth()
    let authUnsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setDname(currentUser.displayName)
      }
    })

    authUnsub()
  }, [])

  return (
    <div className={styles.home}>
      <div style={{ padding: '20px' }}>
        <h1>Social</h1>
        <img src={user.photoURL} className={styles.heroImage} />
      </div>
      <MenuOption name="&larr;" href="/profile" />
      <MenuOption name={dname} href="" />
      <MenuOptionCB name="Dragon Name" callback={() => {
        let displayName = prompt('Enter your new Dragon Name:')
        updateProfile(user, { displayName })
        user.displayName = displayName
        setDname(displayName)
      }} />
    </div>
  )
}
