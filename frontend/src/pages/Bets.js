import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addBet, removeBet, updateBet } from '../slices/betSlice';

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

    return (
        <div>
            <h2 className='user-bets'>Your Bets</h2>
            {/* <div className='user-bets'>
                {bets.map((bet) => (
                    <div key={bet.id}>
                        <h3>{bet.title}</h3>
                        <p>{bet.description}</p>
                        <p>{bet.amount}</p>
                        <button onClick={() => handleRemoveBet(bet)}>Remove</button>
                    </div>
                ))}
            </div> */}
        </div>
    )
}

export default Bets;
