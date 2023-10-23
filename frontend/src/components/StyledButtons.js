import React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

// const LoginButton = () => {
//   return (
//     <Box sx={{ display: 'flex', gap: 1 }}>
//       <Button variant="contained" color="primary">
//         Log in
//       </Button>
//       <Button variant="contained" color="success">
//         Join now
//       </Button>
//     </Box>
//   );
// }

const StyledButtons = () => {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="contained" color="primary">
          Log in
        </Button>
        <Button variant="contained" color="success">
          Join now
        </Button>
      </Box>
    );
  }

export default StyledButtons;
