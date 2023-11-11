// React
import { React, useState, createContext, useContext } from 'react';

// MUI
import {  TextField, Grid, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { addActiveBet, submitBets, removeGameByIdAndType } from '../slices/activeBetSlice';
import { authToken } from '../slices/authSlice';

// CSS
import "../css/BetslipBet.css"

// Context
import { ThemeProvider } from "../context/betslipTheme";

// Axios
import axios from 'axios';

const BetslipContainer = styled(Grid)({
  display: 'flex',
  justifyContent: 'flex-start',
  backgroundColor: '#131314',
  border: '5px',
  borderColor: 'black',
  marginBottom: '2px',
  position: 'relative', 
    '&::after': { 
        content: '""', 
        position: 'absolute',
        left: "5%", 
        right: 0, 
        bottom: '-1px', 
        height: '1px',  
        backgroundColor: '#869d97',
    }
});

const BetslipBetInformationContainer = styled(Grid)({
  backgroundColor: '#131314',
  border: '5px',
  borderColor: 'black',
  margin: '3%'
});

const RemoveBetContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  margin: '3%'
  // sx = {{display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'flex-start', height: '100%'}
});

const TeamNameAndOddsContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap'
})

const TeamNameContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  flexGrow: 1
})

const OddsContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap'
})

const TypeOfBetAndCashOutContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  marginBottom: '5%'
})

const TypeOfBetContainer = styled(Grid)({
  display: 'flex',
  flexGrow: 1
})

const CashOutContainer = styled(Grid)({
  display: 'flex',
})

const VersusAndTimeContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  marginBottom: '5%'
  
})

const VersusContainer = styled(Grid)({
  display: 'flex', 
  flexGrow: 1, 
})

const TimeContainer = styled(Grid)({
  display: 'flex'
})

const WagerAndWinContainer = styled(Grid)({
  display: 'flex'
})

const WagerContainer = styled(Grid)({
  display: 'flex',
  marginRight: '1%'
})

const ToWinContainer = styled(Grid)({
  display: 'flex',
  marginLeft: '1%'
})

const formattedOddsSpread = (number) => {
    if (typeof number !== 'number') return "Not a number";
    return number > 0 ? `+${number}` : (number === 0 ? "0" : `${number}`)
}

const formattedBetType = (bet_type) => {
    switch (bet_type) {
        case "away_spread":
        case "home_spread":
            return "Spread";
        case "moneyline_away":
        case "moneyline_home":
            return "Moneyline";
        case "total_over":
        case "total_under":
            return "Total Match Points";
        default:
            return "Unknown Bet Type";
    }
}

function formatDateTime(dateTimeStr) {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const date = new Date(dateTimeStr);

  // Formatting the day
  const day = days[date.getDay()];

  // Formatting the hour
  let hour = date.getHours();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'

  // Formatting minutes
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${hour}:${minutes}${ampm} ET`;
}

function truncateToTwoDecimals(num) {
  return Math.floor(num * 100) / 100;
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  // getMonth() returns 0-11, adding 1 to make it 1-12
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Converting 24hr format to 12hr format
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
}


const BetslipBet = ({bet}) => {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const dispatch = useDispatch();
    const authToken = useSelector((state) => state.auth.token);
    const finalizedBets = useSelector((state) => state.activeBets.finalizedBets);

    console.log(bet);

    const username = useSelector((state) => state.user.username);

    const [formState, setFormState] = useState({
        wager: 0,
        potential_payout: 0,
    });

    const onRemove = (event) => {
      dispatch(removeGameByIdAndType({game_id: bet.game.game_id, bet_type: bet.bet_type}));
      console.log("Remove a bet.");
      return;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        var betTypeName = null;
        var odds = null;
        var points = "Money Line";

        if (bet.bet_type === "moneyline_home") {
          betTypeName = "Home";
          odds = bet.game.home_odds;
        } else if (bet.bet_type === "moneyline_away") {
            betTypeName = "Away";
            odds = bet.game.away_odds;
        } else if (bet.bet_type === "home_spread") {
            betTypeName = "Home Line";
            odds = bet.game.home_spread_odds;
            points = formattedOddsSpread(bet.game.home_spread);
        } else if (bet.bet_type === "away_spread") {
            betTypeName = "Away Line";
            odds = bet.game.away_spread_odds;
            points = formattedOddsSpread(bet.game.away_spread);
        } else if (bet.bet_type === "total_over") {
            betTypeName = "Over";
            odds = bet.game.over_odds;
            points = `${bet.game.total}`;
        } else if (bet.bet_type === "total_under") {
            betTypeName = "Under";
            odds = bet.game.under_odds;
            points = `${bet.game.total}`;
        }

        // Process your form data here, maybe dispatch it somewhere, or send it to an API.
        const formattedBet = {
            account_username: username,
            game_id: bet.game.game_id,
            bet_type: betTypeName,
            odds: odds,
            points: points,
            wager: formState.wager,
            potential_payout: truncateToTwoDecimals(formState.potential_payout + formState.wager),
            timestamp: formatTimestamp(Date.now())
        }

        console.log(formattedBet)
        

        // Send the bet to the backend.
        axios({
          method: "POST",
          url:"/api/bets",
          headers: {
            Authorization: 'Bearer ' + authToken
          },
          data:{
            account_username: username,
            game_id: bet.game.game_id,
            bet_type: betTypeName,
            odds: odds,
            points: points,
            wager: formState.wager,
            potential_payout: truncateToTwoDecimals(formState.potential_payout + formState.wager),
            timestamp: formatTimestamp(Date.now())
           }
        })
        .then((response) => {
          if (response.status === 201) {
            dispatch(removeGameByIdAndType({game_id: bet.game.game_id, bet_type: bet.bet_type}));
            console.log("Submitted bet.");
          }
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })

        // dispatch(submitBets(formattedBet))

        // Clear bets after submission (if desired).
        // dispatch(clearActiveBets());
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "wager") {
          let parsedValue = parseInt(value, 10); // Parse the value to an integer
          let odds = 0;
  
          switch (bet.bet_type) {
              case "away_spread":
                  odds = parseFloat(bet.game.away_spread_odds, 10);
                  break;
              case "home_spread":
                  odds = parseFloat(bet.game.home_spread_odds, 10);
                  break;
              case "moneyline_away":
                  odds = parseFloat(bet.game.away_odds, 10);
                  break;
              case "moneyline_home":
                  odds = parseFloat(bet.game.home_odds, 10);
                  break;
              case "total_over":
                  odds = parseFloat(bet.game.over_odds, 10);
                  break;
              case "total_under":
                  odds = parseFloat(bet.game.under_odds, 10);
                  break;
              default:
                  // Handle unknown bet type
                  break;
          }
  
          if (!isNaN(parsedValue) && !isNaN(odds)) {
              console.log("odds: ", odds)
              setFormState(prevState => ({
                  ...prevState, 
                  [name]: parsedValue, 
                  potential_payout: truncateToTwoDecimals((parsedValue * odds) - parsedValue)
              }));
          } else {
              setFormState(prevState => ({
                ...prevState, 
                [name]: "", 
                potential_payout: ""
            }));
          }
        }
    };

    return (
      <ThemeProvider>

        <BetslipContainer className="betslipBetConatiner">

          {loggedIn === true ?
          (<RemoveBetContainer>
            <IconButton onClick={onRemove} sx={{color: "red", ":hover": {color: "black"}}}>
                <RemoveCircleOutlineIcon />
            </IconButton>
            <IconButton onClick={handleSubmit} sx={{color: "green", ":hover": {color: "black"}}}>
                <AddCircleOutlineIcon />
            </IconButton>
          </RemoveBetContainer>) :

          (<RemoveBetContainer>
            <IconButton sx={{color: "grey", ":hover": {color: "grey"}}}>
                <RemoveCircleOutlineIcon />
            </IconButton>
            <IconButton sx={{color: "grey", ":hover": {color: "grey"}}}>
                <AddCircleOutlineIcon />
            </IconButton>
          </RemoveBetContainer>)
            }

          <BetslipBetInformationContainer className="betslipBetConatiner">
            <TeamNameAndOddsContainer className="teamNameAndOddsContainer">
              <TeamNameContainer className="teamNameContainer">
                <Typography className="betslip-selectedTeam" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
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
              </TeamNameContainer>

                <OddsContainer className="oddsContainer">
                  <Typography className="betOdds" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
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
            </TeamNameAndOddsContainer>

            <TypeOfBetAndCashOutContainer className="typeOfBetAndCashOutContainer">
              <TypeOfBetContainer className="typeOfBetContainer">
              <Typography className="betOdds" variant="caption" sx={{ color: '#749d83' }}>
              {formattedBetType(bet.bet_type)}
              </Typography>
              </TypeOfBetContainer>

              <CashOutContainer className="cashOutContainer">
                {/* <Button variant="contained" sx={{ my: 1, py: 1, px: 1, borderRadius: 20, fontSize: '0.5rem', backgroundColor: 'blue', '&:hover': { backgroundColor: 'darkblue' } }}>
                    Cash Out
                </Button> */}
              </CashOutContainer>
            </TypeOfBetAndCashOutContainer>

            <VersusAndTimeContainer>
              <VersusContainer className="versusContainer">
                <Typography className="betslip-betTeamNames" variant="caption" sx={{ textAlign: 'center' }}>
                    {bet.game.away_team} @ {bet.game.home_team}
                </Typography>
              </VersusContainer>

              <TimeContainer className="timeContainer">
              <Typography className="betslip-betTeamNames" variant="caption" sx={{ textAlign: 'center' }}>
                {formatDateTime(bet.game.date)}
              </Typography>
              </TimeContainer>
            </VersusAndTimeContainer>

            <WagerAndWinContainer>
              <WagerContainer className="wagerContainer">
                <TextField
                        name="wager" 
                        label="Wager" 
                        variant="outlined" 
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{ input: { color: 'white' }, label: { color: 'gray' }, borderColor: 'gray', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'gray' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'blue' } } }}
                        onChange={handleChange}
                        value={formState.wager}
                />
              </WagerContainer>

              <ToWinContainer className="toWinContainer">
                <TextField 
                        name="potential_payout"
                        label="To Win"
                        variant="outlined" 
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{ input: { color: 'white' }, label: { color: 'gray' }, borderColor: 'gray', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'gray' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'blue' } } }}
                        onChange={handleChange}
                        value={formState.potential_payout}
                />
              </ToWinContainer>
            </WagerAndWinContainer>

          </BetslipBetInformationContainer>
        </BetslipContainer>

      </ThemeProvider>
    );
};

export default BetslipBet;
