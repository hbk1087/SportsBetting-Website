import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const CircleCounter = ({ number }) => {

    useEffect(() => {
    }, [number])


    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center" 
            border="2px solid white"
            borderRadius="50%" 
            width="50px" 
            height={"auto"} 
            bgcolor="primary.main" 
            color="white" 
>
            <Typography 
                variant="body1" 
                style={{ textAlign: "center", color: "blue" }}>
                {number}
            </Typography>
        </Box>
    );
}

export default CircleCounter;