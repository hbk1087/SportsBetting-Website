// React
import { useEffect, useState } from 'react'

// components
import GameDetails from '../components/GameDetails'

// MUI
import { Typography, Container } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';

// axios
import axios from 'axios'
import GameOddsHeader from '../components/GameOddsHeader'

// CSS
import '../css/Home.css'


const Home = () => {
    const [game, setGame] = useState([{}])

    // Loading symbol state
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.title = "AlgoSportsBets"

              axios({
                method: "GET",
                url: "/api/home",
              })
              .then((response) => {
                const res = response.data;
                console.log(res);
                setGame(res);
              })
              .catch((error) => {
                if (error.response) {
                  console.log(error.response);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                }
              })
              .finally(() => {
                setLoading(false)
              });

    }, [])
    

    return (
        
            <div>
            {loading ? (
                <Container style={{ display: 'flex', width: '900px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexWrap:'nowrap', gap: '30px', top: 0, marginTop: '90px' }} spacing={3} elevation={3}>
                    <Typography variant="h3" align="center" color="primary">
                        Loading All Games...
                    </Typography>
                    <LoadingSpinner />
                </Container>
            ) :
            

            (<div className="page-content">
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
        </div>)}
        </div>
    )
}

export default Home;