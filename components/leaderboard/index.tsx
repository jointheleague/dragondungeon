import { Player } from 'common'
import { MapSchema } from '@colyseus/schema'
import { Countdown } from 'common/Countdown'
import { Box } from 'components'

import styles from 'styles/leaderboard.module.css'
import { useEffect, useState } from 'react'

function renderCountdown(countdown: Countdown) {
    if (countdown.done) { return '0:00' }
    if (countdown.minutes === 0) { return `0:${Math.floor(countdown.seconds)}` }
    if (Math.floor(countdown.seconds) < 10) { return `${countdown.minutes}:0${Math.floor(countdown.seconds)}` }
    return `${countdown.minutes}:${Math.floor(countdown.seconds)}`
}

function renderTableData(players: MapSchema<Player>) {
    let leaderboardData = []
    players.forEach((player: Player, key: any) => {
        const score = player.score;
        let name = player.onlineName;
        const ballType = player.ballType;
        leaderboardData.push(<tr key={key}>
            <td className="playerData"><img src={`/img/abilities/${ballType}ball.png`} style={{ height: '30px' }} /></td>
            <td className="playerData">{name}</td>
            <td className="playerData"><b><big>{score}</big></b></td>
        </tr>)
    })
    return leaderboardData
}

function renderMobileTableData(players: MapSchema<Player>) {
    let leaderboardData = []
    players.forEach((player: Player, key: any) => {
        const score = player.score;
        let name = player.onlineName;
        const ballType = player.ballType;
        leaderboardData.push(<span key={key} style={{ color: 'white' }}>
            <span className="playerData">{name}</span>&nbsp;&nbsp;
            <b className="playerData" style={{ fontSize: '25px' }}>{score}</b>
        </span>)
    })
    return leaderboardData
}

export function Leaderboard(props: {
    players: MapSchema<Player>,
    countdown: Countdown
}) {

    const [countdownRender, setCountdownState] = useState<String>("5:00")
    const [players, setPlayerState] = useState<MapSchema<Player>>(props.players)

    useEffect(() => {
        let clockInterval = setInterval(() => {
            setCountdownState(renderCountdown(props.countdown))
        }, 100)
        return () => clearInterval(clockInterval)
    }, [])

    return (
        <>
            {(window.innerWidth >= 1000) && <div className={styles.leaderboardContainer} >
                <h1>Dragon Dungeon</h1>
                <h2>{countdownRender}</h2>
                <h3>{new Date().toLocaleTimeString()}</h3>
                <table><tbody id='leaderboard'>{renderTableData(props.players)}</tbody></table>
            </div>}

            {(window.innerWidth <= 1000) && <>
                <p className={styles.mobileCountdown}>{countdownRender}</p>
                <Box>{renderMobileTableData(players)}</Box>
            </>}
        </>
    )
}