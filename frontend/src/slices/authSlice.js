import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchAuth = createAsyncThunk(


// Initial state for the auth slice
const initialState = {
  token: localStorage.getItem('token') || null,
  loggedIn : localStorage.getItem('loggedIn') || false
};

// Define the authSlice using createSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
      localStorage.setItem('loggedIn', true)
      state.loggedIn = true;
    },
    removeToken: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      localStorage.removeItem('loggedIn')
      state.loggedIn = false;
    },
    initializeToken: (state) => {
      state.token = localStorage.getItem('token');
    },
    setLoggedIn: (state, action) => {
      localStorage.setItem('loggedIn', action.payload)
      state.loggedIn = action.payload;
    }
  },
});

// Export action creators and the reducer
export const { setToken, removeToken, initializeToken, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
