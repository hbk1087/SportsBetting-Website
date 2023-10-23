import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import betReducer from './slices/betSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    bet: betReducer
  },
});
