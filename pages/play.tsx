import React from 'react'
import dynamic from 'next/dynamic'

let CoreViewCSR = dynamic(
    () => import('../app/view/CoreView'),
    { ssr: false },
)

export default function Game() {
    return <CoreViewCSR />
}
