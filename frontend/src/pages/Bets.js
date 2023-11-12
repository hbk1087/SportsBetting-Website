import React from 'react';

// Components
import LoadingSpinner from '../components/LoadingSpinner';

// Redux
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'

// MUI
import { Typography, Container } from '@mui/material';

// Axios
import axios from 'axios';
import '../css/MyBets.css';
import MyBet from '../components/MyBet';

function Bets() {

    const [bets, setBet] = useState([])
    const [loading, setLoading] = useState(true)

    const authToken = useSelector((state) => state.auth.token);

    useEffect(() => {
        document.title = "Bets"
        setLoading(true)

        axios({
            method: "GET",
            url:"/api/bets",
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
    }, [])

    return (
        <div>
        <div className='betsContainer'>
        <Container>
           {loading ? (
                <Container style={{ display: 'flex', maxWidth: '800px', margin: '0 auto', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexWrap:'nowrap', gap: '30px' }} spacing={3} elevation={3}>
                    <Typography variant="h3" align="center" color="primary">
                        Loading Bets...
                    </Typography>
                    <LoadingSpinner />
                </Container>
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
