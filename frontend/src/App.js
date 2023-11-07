// Router DOM imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Material UI imports
import { createTheme, ThemeProvider } from '@mui/material/styles'

// Pages
import Home from './pages/Home'
import Bets from './pages/Bets'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Account from "./pages/Account"
import NFLPage from './pages/nfl'

// Components
import Navbar from "./components/Navbar"
import PrivateRoute from "./components/PrivateRoute"
import NotFound from "./components/NotFound"


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

    useEffect(() => {
        console.log("App.js: isLoggedIn: " + isLoggedIn)
        console.log("App.js: hasToken: " + hasToken)
    }, [isLoggedIn, hasToken])

    return (
          <ThemeProvider theme={theme}>
              <Router>
                    <div className="App">  
                        <Navbar />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/account" element={<PrivateRoute> <Account /> </PrivateRoute>} />
                            <Route path='/bets' element={<PrivateRoute> <Bets /> </PrivateRoute>} />
                            <Route path='/signup' element={<SignUp />} />
                            <Route path='/nfl' element={<NFLPage />} />
                            <Route path='/*' element={<NotFound />}/>
                        </Routes>
                    </div>
              </Router>
          </ThemeProvider>
    );
  }

export default App
