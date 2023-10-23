import React from 'react';

import { useState } from 'react';

import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';

// Custom styled button for the login
const LoginButton = styled(Button)(({ theme }) => ({
    marginRight: theme.spacing(2),
    backgroundColor: '#007BFF',
    '&:hover': {
      backgroundColor: '#0056b3', // a bit darker on hover
    }
  }));
  
  // Custom styled button for the signup/join
  const JoinButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#28A745',
    '&:hover': {
      backgroundColor: '#1f7a33', // a bit darker on hover
    }
  }));

const Navbar = () => {
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState({})


    return (
        <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
            </IconButton>

            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6">
                Sports Betting
                </Typography>
            </Link>
            
            <Button color="inherit" component={Link} to='/bets'>Bets</Button>
            <div style={{ flexGrow: 1 }}></div>
            <LoginButton color="inherit" component={Link} to='/login'>Login</LoginButton>
            <JoinButton color="inherit" component={Link} to='/signup'>Signup</JoinButton>

        </Toolbar>
        </AppBar>
    );
}

export default Navbar;
