import React from 'react'
import dynamic from 'next/dynamic'
import NoSSR from 'react-no-ssr'

import CoreView from '../app/view/CoreView'

export default function Game() {
    return <NoSSR><CoreView /></NoSSR>
}
