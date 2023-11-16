import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

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
    const balance = state.user.balance;

    // check wager total of all bets against balance

    const calculateTotalWager = (bets) => bets.reduce((total, bet) => total + bet.wager, 0);

    if (calculateTotalWager(bets) > balance) {
        // console.log("Not enough funds. Please deposit more money.");
        alert("Not enough funds. Please deposit more money."); 
        return;
    }

    const promiseBets = bets.map(bet => {
        const requestData = {
            method: "POST",
            url:"https://sb-backend-6409fb97857a.herokuapp.com/api/bets",
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

        return axios(requestData).catch(error => {
            if (error.response) {
                if (error.response.status === 400) {
                    if (error.response.data.error === "Insufficient funds for wager") {
                        return Promise.reject("Insufficient funds for wager");
                    } else if (error.response.data.error === "Bet is not completely filled out") {
                        return Promise.reject("Bet is not completely filled out");
                    }
                } else if (error.response.status === 401) {
                    alert("There was an issue authenticating your details. Please sign in again.");
                }
            }

            return Promise.reject("Error submitting bet");
        });
    });

    return Promise.allSettled(promiseBets)
        .then(results => {
            const failedBets = results.filter(result => result.status === 'rejected');

            if (failedBets.length > 0) {
                throw new Error('Failed to submit all bets.');
            }

            if (bets.length === 0){
                throw new Error('No bets.');
            }

            dispatch(clearActiveBets());
        })
        .catch(error => {
            throw error;
        });
};


export const { addActiveBet, addFinalizedBet, updateExistingFinalizedBet, clearActiveBets, openActiveBet, removeGameByIdAndType } = activeBetSlice.actions;
export default activeBetSlice.reducer;