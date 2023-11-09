import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  loggedIn : false
};

export const authSlice = createSlice({
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

export const { setToken, removeToken, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
