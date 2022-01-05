import React from 'react'
import dynamic from 'next/dynamic'

const CoreView = dynamic(() => import('app/view/CoreView'), { ssr: false })

export default function Game() {
  return <CoreView />
}
