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
            marginRight="10px"
>
            <Typography 
                variant="body3" 
                style={{ fontWeight: "bold", textAlign: "center", color: "black", maxHeight: '100%' }}>
                {number}
            </Typography>
        </Box>
    );
}

export default CircleCounter;