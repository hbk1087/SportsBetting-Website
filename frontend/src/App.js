// Router DOM imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Redux imports
import { Provider } from 'react-redux'
import { store } from "./store"

// Material UI imports
import { createTheme, ThemeProvider } from '@mui/material/styles'

// Pages
import Home from './pages/Home'
import Bets from './pages/Bets'
import Login from './pages/Login'
import Signup from './pages/SignUp'

// Components
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Account from "./components/Account"

// Hooks
import { useToken } from './hooks/useToken'


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
  return (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <div className="App">
                <Router>
                    <Navbar />
                    <div className="pages">
                    <Routes>
                        <Route path='/' element={<Home />}/>
                        <Route path='/bets' element={<Bets />}/>
                        <Route path='/login' element={<Login />}/>
                        <Route path='/signup' element={<Signup />}/>

                    </Routes>
                    </div>

                    <Sidebar />

                </Router>
            </div>
        </ThemeProvider>
    </Provider>
    
  );
}

export default App
