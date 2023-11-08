import { configureStore } from '@reduxjs/toolkit';

// redux persist for authentication
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// user-defined reducers
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import betsReducer from './slices/betSlice';
import activeBetsReducer from './slices/activeBetSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'user']
}

const persistAuthReducer = persistReducer(persistConfig, authReducer);
const persistUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistUserReducer,
    auth: persistAuthReducer,
    bets: betsReducer,
    activeBets: activeBetsReducer,
  },
});

export const persistor = persistStore(store);

export default { store, persistor };