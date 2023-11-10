import { createSlice } from '@reduxjs/toolkit';

import { useSelector } from 'react-redux';

import axios from 'axios';

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

const formattedOddsSpread = (number) => {
    if (typeof number !== 'number') return "Not a number";
    return number > 0 ? `+${number}` : (number === 0 ? "0" : `${number}`)
}

const initialState = {
    bets: [],
    finalizedBets: [],
    hasActiveBets: false
};

const activeBetSlice = createSlice({
    name: 'activeBets',
    initialState,
    reducers: {
        openActiveBet: (state, action) => {
            // username, bet, wager, potential payout

            const username = action.payload.username;

            var betTypeName = null;
            var odds = null;
            var points = "Money Line";

            if (action.payload.bet_type === "moneyline_home") {
            betTypeName = "Home";
            odds = action.payload.game.home_odds;
            } else if (action.payload.bet_type === "moneyline_away") {
                betTypeName = "Away";
                odds = action.payload.game.away_odds;
            } else if (action.payload.bet_type === "home_spread") {
                betTypeName = "Home Line";
                odds = action.payload.game.home_spread_odds;
                points = formattedOddsSpread(action.payload.game.home_spread);
            } else if (action.payload.bet_type === "away_spread") {
                betTypeName = "Away Line";
                odds = action.payload.game.away_spread_odds;
                points = formattedOddsSpread(action.payload.game.away_spread);
            } else if (action.payload.bet_type === "total_over") {
                betTypeName = "Over";
                odds = action.payload.game.over_odds;
                points = `${action.payload.game.total}`;
            } else if (action.payload.bet_type === "total_under") {
                betTypeName = "Under";
                odds = action.payload.game.under_odds;
                points = `${action.payload.game.total}`;
            }

            // Process your form data here, maybe dispatch it somewhere, or send it to an API.
            const formattedBet = {
                account_username: username,
                game_id: action.payload.game.game_id,
                bet_type: betTypeName,
                odds: odds,
                points: points,
                wager: action.payload.wager,
                potential_payout: truncateToTwoDecimals(action.payload.potential_payout + action.payload.wager),
                timestamp: formatTimestamp(Date.now())
            }

            console.log("WHEN ADDING TO FINALIZED", formattedBet);

            state.finalizedBets.push(formattedBet);
            state.bets.push(action.payload);
            state.hasActiveBets = true;

            console.log("Bet payload: ", action.payload)
        },
        removeGameByIdAndType: (state, action) => {
            state.bets = state.bets.filter(bet => !(bet.game.game_id === action.payload.game_id && bet.bet_type === action.payload.bet_type));
        },
        clearActiveBets: (state) => {
            state.hasActiveBets = false;
            state.bets = [];
            state.gameChoiceIds = [];
            state.finalizedBets = [];
        }, 
    }
})

export const submitBets = () => (dispatch, getState) => {
    const state = getState();
    const bets = state.activeBets.finalizedBets;
    const authToken = state.auth.token;
    const username = state.user.username;

    Promise.all(bets.map(bet => {

        const requestData = {
            method: "POST",
            url:"/api/bets",
            headers: {
              Authorization: 'Bearer ' + authToken
            },
            data: bet
        };

        console.log("request data", requestData);

        return axios(requestData)
        .then(response => {
            if (response.status === 201) {
                dispatch(removeGameByIdAndType({game_id: bet.game.game_id, bet_type: bet.bet_type}));
            }
        })
        .catch(error => {
            console.error("Could not submit bet:", bet, "; Error:", error);
        });
    }))
    .then(() => {
        console.log("Submitted all bets.");
    })
    .catch(error => {
        console.error("An error occurred in submitting bets:", error);
    });
};


export const { addGameChoiceId, removeGameChoiceId, clearGameChoiceIds, addActiveBet, clearActiveBets, openActiveBet, removeGameByIdAndType } = activeBetSlice.actions;
export default activeBetSlice.reducer;