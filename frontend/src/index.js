import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./store"
import { createTheme } from '@mui/material/styles'
import { BrowserRouter as Router } from 'react-router-dom';

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
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

