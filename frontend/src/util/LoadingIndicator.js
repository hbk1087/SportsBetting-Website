// LoadingIndicator.js
import React from 'react';

// MUI
import { Typography, Container } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';


function LoadingIndicator({text, margtop, wid}) {
  return (
    <Container style={{ display: 'flex', width: wid, margin: '0 auto', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexWrap:'nowrap', gap: '30px', marginTop: margtop }} spacing={3} elevation={3}>
        <Typography variant="h3" align="center" color="primary">
            {text}
        </Typography>
        <LoadingSpinner />
    </Container>
  );
}

export default LoadingIndicator;
