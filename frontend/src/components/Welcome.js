import { Box } from '@mui/system';

import '../css/Welcome.css'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Welcome = ({ username }) => {
    const dispatch = useDispatch();


    return (


        
        <Box className="welcome" variant="contained" color="primary">
            <h4>Welcome, {username}</h4>
        </Box>
    )
}

export  default Welcome;