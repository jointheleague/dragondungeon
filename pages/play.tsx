import React from 'react'
import dynamic from 'next/dynamic'

const FakeView = dynamic(() => import('../app/view/FakeView'), { ssr: false })

export default function Game() {
  console.log('coreview init')

  return <FakeView />
}
