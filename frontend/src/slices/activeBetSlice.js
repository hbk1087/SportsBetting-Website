import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bets: [],
    hasActiveBets: false
};

// account_username, game_id, bet_type, wager, potential_payout, timestamp
// Away, Home, Away Line, Home Line, Over, Under

const activeBetSlice = createSlice({
    name: 'activeBets',
    initialState,
    reducers: {
        openActiveBet: (state, action) => {
            state.bets.push(action.payload);
            state.hasActiveBets = true;

            console.log("Bet payload: ", action.payload)
        },

        submitBets: (state, action) => {

            console.log("fkwkjenffew", action.payload)

        },
        removeGameByIdAndType: (state, action) => {
            state.bets = state.bets.filter(bet => !(bet.game.game_id === action.payload.game_id && bet.bet_type === action.payload.bet_type));
        },
        clearActiveBets: (state) => {
            state.hasActiveBets = false;
            state.bets = [];
            state.gameChoiceIds = [];
        }, 
    }
})

export const { addGameChoiceId, removeGameChoiceId, clearGameChoiceIds, addActiveBet, clearActiveBets, openActiveBet, removeGameByIdAndType, submitBets } = activeBetSlice.actions;
export default activeBetSlice.reducer;