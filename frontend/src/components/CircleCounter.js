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
            borderRadius="50%" 
            width="25px" 
            height={"auto"} 
            bgcolor="primary.main" 
            color="white" 
            marginLeft="10px"
>
            <Typography 
                variant="body1" 
                style={{ textAlign: "center", color: "black" }}>
                {number}
            </Typography>
        </Box>
    );
}

export default CircleCounter;