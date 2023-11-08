import { React, useState } from 'react';
import { Button, TextField, Box, Typography, IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch, useSelector } from 'react-redux';

import { addActiveBet } from '../slices/activeBetSlice';


import "../css/BetslipBet.css"

const BetslipBet = ({bet}) => {
    const dispatch = useDispatch();

    console.log(bet);

    const username = useSelector((state) => state.user.username);
    var selectedGameId = useSelector((state) => state.activeBets.selectedGameId);
    var selectedGameBetType = useSelector((state) => state.activeBets.selectedGameBetType);

    const [formState, setFormState] = useState({
        wager: 0,
        potential_payout: 0,
    });

    const onRemove = (event) => {
      console.log("Remove a bet.")
      return
    }

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
          if (bet.bet_type === "away_spread")
          {
            setFormState(prevState => ({...prevState, [name]: value, potential_payout: value * parseInt(bet.game.away_spread_odds)}))
          }
          else if (bet.bet_type === "away_spread")
          {
            setFormState(prevState => ({...prevState, [name]: value, potential_payout: value * 2}))
          }
          else
          {
            setFormState(prevState => ({...prevState, [name]: value, potential_payout: value * 2}))
          }
        }

        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        // <Box sx={{
        //     display: 'flex',
        //     flexWrap: 'wrap',
        //     backgroundColor: 'black',
        //     color: 'white',
        //     borderRadius: 2,
        //     padding: 2,
        //     maxWidth: 376,
        //     height: 
        //     margin: 'auto'
        //   }}>
        //     <Box className="betslip-remove" sx = {{display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'flex-start', height: '100%'}}>
        //       <IconButton onClick={onRemove} sx={{ color: 'red' }}>
        //         <RemoveCircleOutlineIcon />
        //       </IconButton>
        //     </Box>

        //     {/* Header */}
        //     <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>

        //     <Typography className="betslip-selectedTeam">
            // {
            //     bet.bet_type === 'away_spread'
            //     ? `${bet.game.away_team} ${bet.game.away_spread}`
            //     : bet.bet_type === 'moneyline_away'
            //     ? `${bet.game.away_team}` 
            //     : bet.bet_type === 'total_over'
            //     ? `Over ${bet.game.total}` 
            //     : bet.bet_type === 'home_spread'
            //     ? `${bet.game.home_team} ${bet.game.home_spread}` 
            //     : bet.bet_type === 'moneyline_home'
            //     ? `${bet.game.home_team}` 
            //     : bet.bet_type === 'total_under'
            //     ? `Under ${bet.game.total}` 
            //     : 'Unknown Bet Type' // Fallback for unrecognized bet types
            // }
        //     </Typography>

        //     <Typography className="betOdds" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            // {
            //     ({
            //     'away_spread': `${bet.game.away_spread_odds}`,
            //     'moneyline_away': `${bet.game.away_odds}`,
            //     'total_over': `${bet.game.over_odds}`,
            //     'home_spread': `${bet.game.away_spread_odds}`,   
            //     'moneyline_home': `${bet.game.home_odds}`, 
            //     'total_under': `${bet.game.under_odds}`    
            //     })[bet.bet_type] || 'Unknown Bet Type'  // Default text if bet type doesn't match
            // }
        //     </Typography>

        //     </Box>

        //     <Button variant="contained" sx={{ my: 2, py: 1, fontSize: '0.25rem' }}>
        //       Cash Out
        //     </Button>
            
        //     <Typography className="betslip-betTeamNames" variant="body2">{bet.game.away_team} @ {bet.game.home_team}</Typography>
        //     {/* <Typography variant="body2">{time}</Typography> */}
            
        //     {/* Form Inputs */}
        //     <Box component="form" sx={{ display: 'flex', justifyContent: 'space-between' }}>
        //       <TextField 
        //         label="Wager" 
        //         type="number"
        //         variant="outlined" 
        //         InputLabelProps={{ shrink: true }}
        //         InputProps={{ style: { color: 'white' } }}
        //         sx={{ input: { color: 'black' }, label: { color: 'gray' , '&.Mui-focused' : {color : 'blue'}}, borderColor: 'gray' }}
        //         onChange={handleChange}
        //       />
        //       <TextField 
        //         label="To Win" 
        //         type="number"
        //         variant="outlined" 
        //         InputLabelProps={{ shrink: true }}
        //         InputProps={{ style: { color: 'white' } }}
        //         sx={{ input: { color: 'black' }, label: { color: 'gray' }, borderColor: 'gray' }}
        //         onChange={handleChange}
        //       />
        //     </Box>
        //   </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          color: 'white',
          borderRadius: 2,
          padding: 2,
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)', // subtle shadow
          maxWidth: 376,
          margin: 'auto'
          }}>
          {/* Close Button */}
          <IconButton onClick={onRemove} sx = {{display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'flex-start', height: '100%'}}>
              <RemoveCircleOutlineIcon />
          </IconButton>
      
          {/* Header */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Typography className="betslip-selectedTeam" sx={{ fontWeight: 'bold' }}>
              {
                bet.bet_type === 'away_spread'
                ? `${bet.game.away_team} ${bet.game.away_spread}`
                : bet.bet_type === 'moneyline_away'
                ? `${bet.game.away_team}` 
                : bet.bet_type === 'total_over'
                ? `Over ${bet.game.total}` 
                : bet.bet_type === 'home_spread'
                ? `${bet.game.home_team} ${bet.game.home_spread}` 
                : bet.bet_type === 'moneyline_home'
                ? `${bet.game.home_team}` 
                : bet.bet_type === 'total_under'
                ? `Under ${bet.game.total}` 
                : 'Unknown Bet Type' // Fallback for unrecognized bet types
            }
              </Typography>
              <Typography className="betOdds" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {
                ({
                'away_spread': `${bet.game.away_spread_odds}`,
                'moneyline_away': `${bet.game.away_odds}`,
                'total_over': `${bet.game.over_odds}`,
                'home_spread': `${bet.game.away_spread_odds}`,   
                'moneyline_home': `${bet.game.home_odds}`, 
                'total_under': `${bet.game.under_odds}`    
                })[bet.bet_type] || 'Unknown Bet Type'  // Default text if bet type doesn't match
              }
              </Typography>
          </Box>
      
          {/* Cash Out Button */}
          <Button variant="contained" sx={{ my: 2, py: 1, px: 3, borderRadius: 20, fontSize: '0.875rem', backgroundColor: 'blue', '&:hover': { backgroundColor: 'darkblue' } }}>
              Cash Out
          </Button>
      
          {/* Matchup and Time */}
          <Typography className="betslip-betTeamNames" variant="body2" sx={{ textAlign: 'center' }}>
              {bet.game.away_team} @ {bet.game.home_team}
          </Typography>
          {/* ... code for time if needed ... */}
      
          {/* Form Inputs */}
          <Box component="form" sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <TextField 
                  label="Wager" 
                  type="number"
                  variant="outlined" 
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ style: { color: 'white' } }}
                  sx={{ input: { color: 'white' }, label: { color: 'gray' }, borderColor: 'gray', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'gray' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'blue' } } }}
                  onChange={handleChange}
              />
              <TextField 
                  label="To Win" 
                  type="number"
                  variant="outlined" 
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ style: { color: 'white' } }}
                  sx={{ input: { color: 'white' }, label: { color: 'gray' }, borderColor: 'gray', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'gray' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'blue' } } }}
                  onChange={handleChange}
              />
          </Box>
      </Box>
      
    );
};

export default BetslipBet;
