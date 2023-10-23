import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store";
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
      primary: {
          main: '#2b90ff',
      },
      secondary: {
          main: '#3f51b5',
      },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

