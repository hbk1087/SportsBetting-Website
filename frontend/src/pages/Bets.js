import React from 'react';

// Components
import LoadingSpinner from '../components/LoadingSpinner';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addBet, removeBet, updateBet } from '../slices/betSlice';
import { useEffect, useState } from 'react'

// MUI
import { Typography, Container, Paper, List, ListItem, ListItemText } from '@mui/material';

// Axios
import axios from 'axios';
import '../css/MyBets.css';

function Bets() {
    // const bets = useSelector((state) => state.bets.bets);
    const dispatch = useDispatch();

    const handleAddBet = (bet) => {
        dispatch(addBet(bet));
    }

    const handleRemoveBet = (bet) => {
        dispatch(removeBet(bet));
    }

    const handleUpdateBet = (bet) => {
        dispatch(updateBet(bet));
    }

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
        <div className='betsContainer'>
        <Container>
           {loading ? (
                <Typography variant="h6" align="center" justify="center" color="primary">
                    Loading bets...
                    <LoadingSpinner />
                </Typography>
            ) : bets.length === 0 ? (
                <Typography variant="h6" align="center">
                    No bets placed.
                </Typography>
            ) : (
                <Paper spacing={3} elevation={3}>
                    <Typography variant="h3" align="center" color="primary">
                        Your Bets
                    </Typography>
                    <List>
                        {bets.map((betItem, index) => (
                            <ListItem key={betItem.game_id}>
                                <ListItemText
                                    primary={`${betItem.away_team} vs. ${betItem.home_team}`}
                                    secondary={`Wager: ${betItem.wager}, Payout: ${betItem.actual_payout}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </Container>
        </div>
    )
}

export default Bets;
