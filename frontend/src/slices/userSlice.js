import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: "test",
  balance: 1000,
  lifetime_winnings: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    placeBet: (state, action) => {
      state.balance -= action.payload.amount;
      state.lifetime_winnings -= action.payload.amount;
    },
    initializeBalance: (state, action) => {
      state.balance = action.payload
    },
  }
});

export const { setUsername, placeBet, initializeBalance } = userSlice.actions;
export default userSlice.reducer;
