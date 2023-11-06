import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bets: []
};

const betsSlice = createSlice({
    name: 'bets',
    initialState,
    reducers: {
        addBet: (state, action) => {
            state.bets.push(action.payload);
        },
        removeBet: (state, action) => {
            state.bets = state.bets.filter(bet => bet.id !== action.payload.id);
        },
        updateBet: (state, action) => {
            const index = state.bets.findIndex(bet => bet.id === action.payload.id);
            state.bets[index] = action.payload;
        }
    }
})

export const { addBet, removeBet, updateBet } = betsSlice.actions;
export default betsSlice.reducer;