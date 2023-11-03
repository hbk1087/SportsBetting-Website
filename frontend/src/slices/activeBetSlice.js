import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bets: [],
};

// account_username, game_id, bet_type, wager, potential_payout, timestamp
// Away, Home, Away Line, Home Line, Over, Under

const activeBetSlice = createSlice({
    name: 'activeBets',
    initialState,
    reducers: {
        openActiveBet: (state, action) => {
            state.bets.push(action.payload);

            console.log(action.payload)
        },

        addActiveBet: (state, action) => {

            if (action.payload.bet_type === "Home") {
                action.payload.potential_payout = action.payload.wager * action.payload.home_odds;
            } else if (action.payload.bet_type === "Away") {
                action.payload.potential_payout = action.payload.wager * action.payload.away_odds;
            } else if (action.payload.bet_type === "Home Spread") {
                action.payload.potential_payout = action.payload.wager * action.payload.home_spread_odds;
            } else if (action.payload.bet_type === "Away Spread") {
                action.payload.potential_payout = action.payload.wager * action.payload.away_spread_odds;
            } else if (action.payload.bet_type === "Over") {
                action.payload.potential_payout = action.payload.wager * action.payload.over_odds;
            } else if (action.payload.bet_type === "Under") {
                action.payload.potential_payout = action.payload.wager * action.payload.under_odds;
            }


            action.payload.timestamp = Date.now();

            const formattedBet = {
                account_username: action.payload.username,
                game_id: action.payload.selectedGameId,
                bet_type: action.payload.selectedGameBetType,
                wager: action.payload.wager,
                potential_payout: action.payload.potential_payout,
                timestamp: action.payload.timestamp
            }

            console.log(formattedBet)
            console.log(action.payload)
        },
        removeGameByIdAndType: (state, action) => {
            state.bets = state.bets.filter(bet => !(bet.game.game_id === action.payload.game_id && bet.bet_type === action.payload.bet_type));
        },
        clearActiveBets: (state) => {
            state.bets = [];
            state.gameChoiceIds = [];
        }, 
    }
})

export const { addGameChoiceId, removeGameChoiceId, clearGameChoiceIds, addActiveBet, clearActiveBets, openActiveBet, removeGameByIdAndType } = activeBetSlice.actions;
export default activeBetSlice.reducer;