import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import betsReducer from './slices/betSlice';
import activeBetsReducer from './slices/activeBetSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    bets: betsReducer,
    activeBets: activeBetsReducer,
  },
});


export default store;