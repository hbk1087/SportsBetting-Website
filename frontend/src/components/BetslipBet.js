import { React, useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { addActiveBet } from '../slices/activeBetSlice';


const BetslipBet = () => {
    const dispatch = useDispatch();

    const username = useSelector((state) => state.user.username);
    var selectedGameId = useSelector((state) => state.activeBets.selectedGameId);
    var selectedGameBetType = useSelector((state) => state.activeBets.selectedGameBetType);

    const [formState, setFormState] = useState({
        wager: 0,
        potential_payout: 0,
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        // Process your form data here, maybe dispatch it somewhere, or send it to an API.
        const formattedBet = {
            account_username: username,
            game_id: selectedGameId,
            bet_type: selectedGameBetType,
            wager: formState.wager,
            potential_payout: 0,
            timestamp: Date.now()
        }

        console.log(formattedBet)

        // Send the bet to the backend.
        // axios.p

        dispatch(addActiveBet({formattedBet}))

        // Clear bets after submission (if desired).
        // dispatch(clearActiveBets());
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "wager") {
            setFormState(prevState => ({...prevState, [name]: value, potential_payout: value * 2}))
        }

        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff'}}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="wager"
                label="Wager"
                name="wager"
                value={formState.wager}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="potential_payout"
                label="Potential Payout"
                name="potential_payout"
                value={formState.potential_payout}
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
            >
                Submit Bet
            </Button>
        </Box>
    );
};

export default BetslipBet;
