import { Box } from '@mui/system';

import '../css/Welcome.css'


const Welcome = ({ username }) => {
    return (
        <Box className="welcome" variant="contained" color="primary">
            <h4>Welcome, {username}</h4>
        </Box>
    )
}

export  default Welcome;