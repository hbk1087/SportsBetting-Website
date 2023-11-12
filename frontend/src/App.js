// Router DOM imports
import { Routes, Route, useMatch } from 'react-router-dom'

// Material UI imports
import { createTheme, ThemeProvider } from '@mui/material/styles'

import './css/App.css'

// Pages
import Home from './pages/Home'
import Bets from './pages/Bets'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Account from "./pages/Account"
import NFLPage from './pages/nfl'
import NBAPage from './pages/nba'

// Components
import Navbar from "./components/Navbar"
import PrivateRoute from "./components/PrivateRoute"
import NotFound from "./components/NotFound"
import Sidebar from './components/Sidebar'
import Betslip from './components/Betslip'

// React
import { useEffect } from 'react'

// Redux
import { useSelector } from 'react-redux'


const theme = createTheme({
    palette: {
        primary: {
            main: '#2b90ff',
        },
        secondary: {
            main: '#3f51b5',
        },
        white: {
          main: '#ffffff'
        }
    },
});

function App() {
    const isLoggedIn = useSelector(state => state.auth.loggedIn);
    const hasToken = useSelector(state => state.auth.token);
    const username = useSelector(state => state.user.username);
    let loginmatch = useMatch("/login");
    let signupmatch = useMatch("/signup");

    useEffect(() => {
    }, [isLoggedIn, hasToken, username])

    return (

          <ThemeProvider theme={theme}>
            <h2 className='hide-on-website'> Please View on Computer! </h2>
                    <div className='hide-on-mobile'>  
                        <div className="page-content">
                        <Navbar />

                            <div className='under-navbar'>
                                {(!loginmatch && !signupmatch) && (
                                    <div className='side-bar-wrapper'>
                                        <div className='side-bar'>
                                            <Sidebar />
                                        </div>
                                    </div>)}

                                <div className='middle'>
                                    <Routes>
                                        <Route path='/' element={<Home />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/account" element={<PrivateRoute auth={{ isLoggedIn: isLoggedIn }}> <Account /> </PrivateRoute>} />
                                        <Route path='/bets' element={<PrivateRoute auth={{ isLoggedIn: isLoggedIn }}> <Bets /> </PrivateRoute>} />
                                        <Route path='/signup' element={<SignUp />} />
                                        <Route path='/nfl' element={<NFLPage />} />
                                        <Route path='/nba' element={<NBAPage />} />
                                        <Route path='/*' element={<NotFound />}/>
                                    </Routes>
                                </div>

                                {(!loginmatch && !signupmatch) && (
                                    <div className='bet-slip-wrapper'>
                                        <div className='bet-slip'>
                                            {!loginmatch && !signupmatch && <Betslip />}
                                        </div>
                                    </div>)}
                            </div>

                        </div>
                    </div>
          </ThemeProvider>
    );
  }

export default App
