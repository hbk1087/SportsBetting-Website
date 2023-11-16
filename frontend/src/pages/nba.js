// React
import { useEffect, useState } from 'react'

// components
import GameDetails from '../components/GameDetails'
import LoadingIndicator from '../util/LoadingIndicator';

// axios
import axios from 'axios'
import GameOddsHeader from '../components/GameOddsHeader'

// CSS
import '../css/Home.css'

const NBAPage = () => {
    const [game, setGame] = useState([{}])

    // Loading symbol state
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.title = "Algo | NBA"

              axios({
                method: "GET",
                url: "https://sb-backend-6409fb97857a.herokuapp.com/api/nba",
              })
              .then((response) => {
                const res = response.data;
                // console.log(res);
                setGame(res);
              })
              .catch((error) => {
                if (error.response) {
                  // console.log(error.response);
                  // console.log(error.response.status);
                  // console.log(error.response.headers);
                }
              })
              .finally(() => {
                setLoading(false)
              });

    }, [])
    
    
    return (
        
            <div>
            {loading ? (
                <LoadingIndicator text={'Loading NBA Games...'} margtop={'90px'} wid={'900px'}/>
            ) :
            (<div className="page-content">
             <div className="game-odds-header">
                <GameOddsHeader sportName="NBA"/>
                <div className='nfl-game-container'>
                    {game.map((gameItem, index) => (
                        <div key={gameItem.game_id} className='game-details-container'>
                            <GameDetails game={gameItem} />
                        </div>
                    ))}
                </div>
            </div>
        </div>)}
        </div>
    )
}

export default NBAPage;