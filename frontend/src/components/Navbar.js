// React 
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Components
import LogoutButton from './buttons/LogoutButton';
import Welcome from './Welcome';

import '../css/Navbar.css';
import logo from '../img/full_sbw_logo.png';

// Custom styled button for the login
const LoginButton = styled(Button)(({ theme }) => ({
    marginRight: theme.spacing(2),
    backgroundColor: '#007BFF',
    '&:hover': {
      backgroundColor: '#0056b3', // a bit darker on hover
    }
  }));
  
// Custom styled button for the signup/join
const SignupButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#28A745',
    '&:hover': {
    backgroundColor: '#1f7a33', // a bit darker on hover
    }
}));

// Custom styled button for My Bets
const MyBetsButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#000000',
    '&:hover': {
    backgroundColor: '#1d1e1f', // a bit darker on hover
    }
}));


const Navbar = () => {
    const authLoggedIn = useSelector((state) => state.auth.loggedIn);
    const username = useSelector((state) => state.user.username);
    const balance = useSelector((state) => state.user.balance);


    useEffect(() => {
    }, [authLoggedIn, balance])

    const appBarStyles = {
        height: '76.6px',
        backgroundColor: "#000000",
        borderBottom: "2px solid #2f2d2f"
    };

    return (
        <div className='navbar'>
            <AppBar position="fixed" style={appBarStyles}>
                <Toolbar>

                    <Link to='/' >
                        <img src={logo} alt="Logo" style={{ height: '140px', width: '196px' }}></img>
                    </Link>

                    { 
                            authLoggedIn === true ?
                            (
                                // When logged in
                                <>
                                    <MyBetsButton color="inherit" component={Link} to='/bets'>My Bets</MyBetsButton>
                                    <div style={{ flexGrow: 1 }}></div>
                                    <Welcome/>
                                    <LogoutButton />
                                    <MyBetsButton color="inherit" component={Link} to='/account'><AccountCircleIcon fontSize="large"></AccountCircleIcon></MyBetsButton>
                                </>
                            ) : 
                            (
                                // When logged out
                                <>
                                    <div style={{ flexGrow: 1 }}></div>
                                    <LoginButton color="inherit" component={Link} to='/login'>Login</LoginButton>
                                    <SignupButton color="inherit" component={Link} to='/signup'>Signup</SignupButton>
                                </>
                            )
                    }
                    
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;
