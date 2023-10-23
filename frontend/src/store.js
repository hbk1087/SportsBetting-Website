import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import sportsReducer from './slices/sportsSlice';
import matchesReducer from './slices/matchesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    sports: sportsReducer,
    matches: matchesReducer,
  },
});
