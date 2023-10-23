import { useEffect, useState } from 'react'

// components
import GameDetails from '../components/GameDetails'

import axios from 'axios'

const Home = () => {
    const [game, setGame] = useState([{}])

    useEffect(() => {
        document.title = "Home"

        axios.get("./nfl")
            .then(response => {
                console.log(response.data)
                setGame(response.data)
            })
            .catch(error => {
                console.error("There was some error fetching the data:", error)
            })
    }, []) // This should update periodically, setInterval?
    

    // TODO: Display "no games today" if there are no games today
    return (
        <div>
            <div>
                {game.map((gameItem, index) => (
                    <div key={gameItem.game_id} className='game-details-container'>
                        <GameDetails game={gameItem} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;