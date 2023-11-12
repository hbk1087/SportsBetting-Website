import { Box, Grid } from '@mui/material';

import '../css/Welcome.css'

import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const Welcome = () => {
    const username = useSelector(state => state.user.username);

    return (
        <Box className="welcome-container">
            <Grid className="welcome">
                <h4 className="welcome-text">Welcome, {username}</h4>
            </Grid>
        </Box>
    )
}


export  default Welcome;