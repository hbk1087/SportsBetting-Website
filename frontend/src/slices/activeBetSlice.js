import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

import { initializeBalance } from './userSlice';

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

const formalizeBetType = (bet_type) => {
    switch (bet_type) {
        case "away_spread":
            return "Away Line";
        case "home_spread":
            return "Home Line";
        case "total_over":
            return "Over";
        case "total_under":
            return "Under";
        case "moneyline_home":
            return "Home";
        case "moneyline_away":
            return "Away";
        case "Away Line":
            return "Away Line";
        case "Home Line":
            return "Home Line";
        case "Over":
            return "Over";
        case "Under":
            return "Under";
        case "Home":
            return "Home";
        case "Away":
            return "Away";
        default:
            return "Unknown Bet Type";
    }
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

            state.bets.push(action.payload);
            state.hasActiveBets = true;
        },
        addFinalizedBet: (state, action) => {
            if (action.payload === null) {
                console.error("Bet element is null. Please check your bet.");
                return state;
            }

            const existingBetIndex = state.finalizedBets.findIndex(b => 
                b.game_id === action.payload.formattedBet.game_id && b.bet_type === action.payload.formattedBet.bet_type
            );

            if (existingBetIndex !== -1){
                state.finalizedBets[existingBetIndex] = action.payload.formattedBet;
            } else {
                state.finalizedBets.push(action.payload.formattedBet);
            }
        },
        removeGameByIdAndType: (state, action) => {
            state.bets = state.bets.filter(bet => !(bet.game.game_id === action.payload.game_id && formalizeBetType(bet.bet_type) === formalizeBetType(action.payload.bet_type)));

            console.log(action.payload.bet_type);

            state.finalizedBets = state.finalizedBets.filter(bet => !(bet.game_id === action.payload.game_id && formalizeBetType(bet.bet_type) === formalizeBetType(action.payload.bet_type)));
        },
        clearActiveBets: (state) => {
            state.hasActiveBets = false;
            state.bets = [];
            state.finalizedBets = [];
        }, 
    }
})

export const submitBets = () => (dispatch, getState) => {
    const state = getState();
    const bets = state.activeBets.finalizedBets;
    const authToken = state.auth.token;

    const submissionError = {
        error: null,
        bet_ids: []
    }

    const outputBets = (bets) => {
        for (const bet of bets){
            console.log(bet);
        }
    };

    // check wager total of all bets against balance

    const calculateTotalWager = (bets) => bets.reduce((total, bet) => total + bet.wager, 0);

    console.log("total wager:", calculateTotalWager(bets));
    const balance = state.auth.balance;

    if (calculateTotalWager > balance) {
        console.log("Not enough funds. Please deposit more money.");
        alert("Not enough funds. Please deposit more money."); 
        return;
    }

    return Promise.all(bets.map(bet => {

        const requestData = {
            method: "POST",
            url:"http://0.0.0.0:5000//api/bets",
            headers: {
              Authorization: 'Bearer ' + authToken
            },
            data: {
                "account_username": bet.account_username,
                "game_id": bet.game_id,
                "bet_type": bet.bet_type,
                "wager": bet.wager,
                "potential_payout": bet.potential_payout,
                "odds": bet.odds,
                "points": bet.points,
                "timestamp": bet.timestamp,
            }
        };

        console.log("request data", requestData);

        return axios(requestData)
        .then(response => {
            if (response.status === 201) {
                // dispatch(removeGameByIdAndType({game_id: bet.game_id, bet_type: bet.bet_type}));
            }
            
        })
        .catch(error => {
            if (error.response.status === 400) {
                if (error.response.data.error === "Insufficient funds for wager") {
                    submissionError.error = "Not enough funds. Please deposit more money.";
                    submissionError.bet_ids.push(bet.id);
                    throw(error);
                } else if (error.response.data.error === "Bet is not completely filled out") {
                    submissionError.error = "Invalid bet. Please check your bet.";
                    submissionError.bet_ids.push(bet.id);
                    throw(error);
              }
        }

        });
    }))
    .then(() => {
        if (submissionError.error === null){
            dispatch(initializeBalance(balance - calculateTotalWager));
            dispatch(clearActiveBets());

            outputBets(bets);
        }
        
    })
    .catch(error => {
        if (submissionError.error !== null) {
            alert(submissionError.error);
        }
    }
    );
};


export const { addActiveBet, addFinalizedBet, updateExistingFinalizedBet, clearActiveBets, openActiveBet, removeGameByIdAndType } = activeBetSlice.actions;
export default activeBetSlice.reducer;