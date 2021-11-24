import Head from 'next/head'

import '../styles/globals.css'

function DragonDungeon({ Component, pageProps }) {
  return <>
    <Head>
      <title>Dragon Dungeon</title>
      <link rel="icon" href="/img/game/coinJar.png" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default DragonDungeon
