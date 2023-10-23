// Router DOM imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Redux imports
import { useSelector, useDispatch, Provider } from 'react-redux'
import { store } from "./store"

// Material UI imports
import { createTheme, ThemeProvider } from '@mui/material/styles'

// Pages
import Home from './pages/Home'
import Bets from './pages/Bets'
import Login from './pages/Login'
import Signup from './pages/SignUp'

// Components
import Logout from "./components/Logout"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Account from "./components/Account"

// Hooks

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

function App() {
    // use authSlice to set token
    const authToken = useSelector((state) => state.auth.token);

    return (
          <ThemeProvider theme={theme}>
              <Router>
                  <div className="App">  
                    <Navbar />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/account" element={<Account />} />
                            <Route path='/bets' element={<Bets />} />
                            <Route path='/signup' element={<Signup />} />
                        </Routes>
                  </div>
              </Router>
          </ThemeProvider>
    );
  }

export default App
