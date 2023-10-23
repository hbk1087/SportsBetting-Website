import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchAuth = createAsyncThunk(


// Initial state for the auth slice
const initialState = {
  token: localStorage.getItem('token') || null,
  loggedIn : false
};

// Define the authSlice using createSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
      state.loggedIn = true;
    },
    removeToken: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.loggedIn = false;
    },
    initializeToken: (state) => {
      state.token = localStorage.getItem('token');
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    }
  },
});

// Export action creators and the reducer
export const { setToken, removeToken, initializeToken, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
