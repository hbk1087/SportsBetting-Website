import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addBet, removeBet, updateBet } from '../slices/betSlice';
import axios from 'axios';
import { useEffect, useState } from 'react'

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

    const [bets, setBet] = useState([{}])
    const authToken = useSelector((state) => state.auth.token);
    var authLoggedIn = useSelector((state) => state.auth.loggedIn);

    useEffect(() => {
        document.title = "Bets"

        axios({
            method: "GET",
            url:"/bets",
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
            })
    }, [])

    return (
        <div className='parentDiv'>
                {bets.map((betItem, index) => (
                    <div key={betItem.game_id} className='bet-details-container'>
                        <p>{betItem.away_team}</p>
                        <p>{betItem.home_team}</p>
                        <p>{betItem.wager}</p>
                        <p>{betItem.actual_payout}</p>
                    </div>
                ))}
        </div>
    )
}

export default Bets;
