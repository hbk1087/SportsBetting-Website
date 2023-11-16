// React
import React from 'react';
import { useEffect, useState } from 'react'

// Components
import MyBet from '../components/MyBet';
import LoadingIndicator from '../util/LoadingIndicator';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Typography, Container } from '@mui/material';

// Axios
import axios from 'axios';

// CSS
import '../css/MyBets.css';


function Bets() {

    const [bets, setBet] = useState([])
    const [loading, setLoading] = useState(true)

    const authToken = useSelector((state) => state.auth.token);

    useEffect(() => {
        document.title = "Algo | My Bets"
        setLoading(true)

        axios({
            method: "GET",
            url:"https://sb-backend-6409fb97857a.herokuapp.com/api/bets",
            headers: {
              Authorization: 'Bearer ' + authToken
            }
          })
            .then(response => {
                console.log(response.data)
                setBet(response.data)
            })
            .catch(error => {
                console.error("There was some error fetching the data:", error)
                setBet([])
            })
            .finally(() => {
                setLoading(false)
            })
    }, [authToken])

    return (
        <div>
        <div className='betsContainer'>
        <Container>
           {loading ? (
                <LoadingIndicator text={'Loading Bets...'} margtop={'90px'} wid={'800px'}/>
            ) : bets.length === 0 ? (
                <Typography variant="h3" align="center" color="#ffffff">
                    No Bets Placed
                </Typography>
            ) : (
                <Container style={{ maxWidth: '800px', margin: '0 auto' }} spacing={3} elevation={3}>
                    <Typography variant="h3" align="center" color="#ffffff">
                        My Bets
                    </Typography>
                    <br></br>
                        {bets.map((betItem, index) => (
                            <MyBet bet={betItem}/>
                        ))}
                </Container>
            )}
        </Container>
        </div>
        </div>
    )
}

export default Bets;
