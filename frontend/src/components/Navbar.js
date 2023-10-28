// React 
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUsername } from '../slices/userSlice'

// MUI
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Components
import LogoutButton from './buttons/LogoutButton';
import Welcome from './Welcome';

import '../css/Navbar.css';
import logo from '../img/textlogo.png';

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


const Navbar = () => {
    const dispatch = useDispatch();

    // user authentication selectors
    const authLoggedIn = useSelector((state) => state.auth.loggedIn);
    const authHasToken = useSelector((state) => state.auth.token);

    // user data selectors
    const username = useSelector((state) => state.user.username);

    useEffect(() => {
        console.log("Navbar.js: authLoggedIn: " + authLoggedIn)
        console.log("Navbar.js: authHasToken: " + authHasToken)

        console.log("Rerendering Navbar.js")
    }, )

    return (
        <AppBar position="static" >
        <Toolbar>

            <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon/>
            </IconButton>

            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={logo} style={{ marginLeft: '10px', height: '60px', width: '150px', padding: '5px'}}></img>
            </Link>

            { 
                    authLoggedIn === true ?
                    (
                        // When logged in
                        <>
                            <Button color="inherit" component={Link} to='/bets'>Bets</Button>
                            <div style={{ flexGrow: 1 }}></div>
                            <Welcome username={username} />
                            <LogoutButton />
                            <Button color="inherit" component={Link} to='/account'><AccountCircleIcon fontSize="large"></AccountCircleIcon></Button>
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
    );
}

export default Navbar;
