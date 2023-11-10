// React
import { useEffect, useState } from 'react'

// components
import GameDetails from '../components/GameDetails'
import Sidebar from '../components/Sidebar'

// axios
import axios from 'axios'
import GameOddsHeader from '../components/GameOddsHeader'

// CSS
import '../css/Home.css'
import Betslip from '../components/Betslip'

const Home = () => {
    const [game, setGame] = useState([{}])

    useEffect(() => {
        document.title = "AlgoSportsBets"

        async function getAllGameData() {
            try {
                const response = await axios({
                  method: "GET",
                  url: "/api/home",
                })
            
                const res = response.data;
                setGame(res)
              } catch (error) {
                if (error.response) {
                  console.log(error.response);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                }
              }
            }

          getAllGameData()
    }, []) // This should update periodically, setInterval?
    

    // TODO: Display "no games today" if there are no games today
    return (
        <div className="page-content">
            

            <div className="game-odds-header">
                <GameOddsHeader sportName="Upcoming Games"/>
                <div className='nfl-game-container'>
                    {game.map((gameItem, index) => (
                        <div key={gameItem.game_id} className='game-details-container'>
                            <GameDetails game={gameItem} />
                        </div>
                    ))}
                </div>
            </div>

            {/* <Betslip /> */}
        </div>
    )
}

export default Home;