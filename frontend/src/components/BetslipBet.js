// React
import { React, useState, createContext, useContext } from 'react';

// MUI
import { Button, TextField, Grid, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { addActiveBet } from '../slices/activeBetSlice';

// CSS
import "../css/BetslipBet.css"

// Context
import { ThemeProvider, useTheme } from "../context/betslipTheme";

const BetslipBetContainer = styled(Grid)({
  backgroundColor: '#ffffff',
  border: '5px',
  borderColor: 'black'
});

const RemoveBetContainer = styled(Grid)({
  display: 'flex',
  // sx = {{display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'flex-start', height: '100%'}
});

const TeamNameAndOddsContainer = styled(Grid)({
  flexDirection: 'row',
  flexWrap: 'nowrap'
})

const OddsContainer = styled(Grid)({
  flexDirection: 'row',
  flexWrap: 'nowrap'
})

const TypeOfBetContainer = styled(Grid)({
  display: 'flex'
})

const CashOutContainer = styled(Grid)({
  display: 'flex'
})

const VersusContainer = styled(Grid)({
  display: 'flex'
})

const TimeContainer = styled(Grid)({
  display: 'flex'
})

const WagerContainer = styled(Grid)({
  display: 'flex'
})

const ToWinContainer = styled(Grid)({
  display: 'flex'
})

const formattedOddsSpread = (number) => {
    if (typeof number !== 'number') return "Not a number";
    return number > 0 ? `+${number}` : (number === 0 ? "0" : `${number}`)
}

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
      <ThemeProvider>

        <BetslipBetContainer className="betslipBetConatiner" >

          <RemoveBetContainer className="removeBetContainer">
            <IconButton onClick={onRemove} sx={{color: "red", ":hover": {color: "black"}}}>
                <RemoveCircleOutlineIcon />
            </IconButton>
          </RemoveBetContainer>

          <TeamNameAndOddsContainer className="teamNameAndOddsContainer">
            <Typography className="betslip-selectedTeam" sx={{ fontWeight: 'bold' }}>
                {
                  bet.bet_type === 'away_spread'
                  ? `${bet.game.away_team} ${formattedOddsSpread(bet.game.away_spread)}`
                  : bet.bet_type === 'moneyline_away'
                  ? `${bet.game.away_team}` 
                  : bet.bet_type === 'total_over'
                  ? `Over ${bet.game.total}` 
                  : bet.bet_type === 'home_spread'
                  ? `${bet.game.home_team} ${formattedOddsSpread(bet.game.home_spread)}` 
                  : bet.bet_type === 'moneyline_home'
                  ? `${bet.game.home_team}` 
                  : bet.bet_type === 'total_under'
                  ? `Under ${bet.game.total}` 
                  : 'Unknown Bet Type' // Fallback for unrecognized bet types
                }
              </Typography>
          </TeamNameAndOddsContainer>

          <OddsContainer className="oddsContainer">
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
          </OddsContainer>

          <TypeOfBetContainer className="typeOfBetContainer">

          </TypeOfBetContainer>

          <CashOutContainer className="cashOutContainer">
            <Button variant="contained" sx={{ my: 2, py: 1, px: 3, borderRadius: 20, fontSize: '0.875rem', backgroundColor: 'blue', '&:hover': { backgroundColor: 'darkblue' } }}>
                Cash Out
            </Button>
          </CashOutContainer>

          <VersusContainer className="versusContainer">
            <Typography className="betslip-betTeamNames" variant="body2" sx={{ textAlign: 'center' }}>
                {bet.game.away_team} @ {bet.game.home_team}
            </Typography>
          </VersusContainer>

          <TimeContainer className="timeContainer">

          </TimeContainer>

          <WagerContainer className="wagerContainer">
            <TextField 
                    label="Wager" 
                    type="number"
                    variant="outlined" 
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ style: { color: 'white' } }}
                    sx={{ input: { color: 'white' }, label: { color: 'gray' }, borderColor: 'gray', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'gray' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'blue' } } }}
                    onChange={handleChange}
            />
          </WagerContainer>

          <ToWinContainer className="toWinContainer">
            <TextField 
                    label="To Win" 
                    type="number"
                    variant="outlined" 
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ style: { color: 'white' } }}
                    sx={{ input: { color: 'white' }, label: { color: 'gray' }, borderColor: 'gray', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'gray' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'blue' } } }}
                    onChange={handleChange}
            />
          </ToWinContainer>

        </BetslipBetContainer>

      </ThemeProvider>
    );
};

export default BetslipBet;
