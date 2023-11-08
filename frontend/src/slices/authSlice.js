import { createSlice } from '@reduxjs/toolkit';

// Initial state for the auth slice
const initialState = {
  token: null,
  loggedIn : false
};

// Define the authSlice using createSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
      state.loggedIn = false;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    }
  },
});

// Export action creators and the reducer
export const { setToken, removeToken, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
