import Link from 'next/link'

import styles from 'styles/credits.module.css'

export default function Credits() {
    return <p style={{ padding: '20px' }}>
        <div className={styles.styledLinkWrapper}> 
            <Link href='/'>&larr;</Link>
        </div>
        <div style={{ padding: '10px' }}>
        The LEAGUE of Amazing Programmers<br />
        https://jointheleague.org
        </div>
        <h2>Music</h2>
        <div style={{ padding: '10px' }}>
        The Descent by Kevin MacLeod<br />
        Link: https://incompetech.filmmusic.io/song/4490-the-descent<br />
        License: https://filmmusic.io/standard-license
        </div>
    </p>
}