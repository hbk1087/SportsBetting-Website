import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    balance: 1000,
    lifetime_winnings: 0
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    placeBet: (state, action) => {
      state.balance -= action.payload.amount;
      state.lifetime_winnings -= action.payload.amount;
    },
    // Add more reducers as needed
    initializeUser: (state, action) => {
      state.username = action.payload;
    },
    initializeBalance: (state, action) => {
      state.balance = action.payload
    },
    getUsername: (state) => {
      return state.username;
    }
  }
});

export const { setUsername, placeBet, initializeUser, getUsername, initializeBalance } = userSlice.actions;

export default userSlice.reducer;
