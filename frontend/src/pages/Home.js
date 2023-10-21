import { useEffect, useState } from 'react'
import { useGamesContext } from "../hooks/useGameContext"

// components
// import GameDetails from '../components/GameDetails'
// import CarForm from "../components/CarForm"

const Home = () => {
    const [game, setGame] = useState([{}])

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch("/nfl")
            const json = await response.json()

            setGame(json)
        }

        fetchGames()
    }, [])
    
    return (
        <div>
            <div>
                {game.map((gameItem, index) => (
                    <div key={index}>
                        <p>Game ID: {gameItem.game_id}</p>
                        <p>Away Team: {gameItem.away_team}</p>
                    </div>
                ))}
                    
            </div>
        </div>
    )
}

export default Home;