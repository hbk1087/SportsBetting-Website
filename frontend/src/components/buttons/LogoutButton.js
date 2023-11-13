// React
import React from 'react';

// Router DOM
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from 'react-redux';
import { removeToken, setLoggedIn } from '../../slices/authSlice'

// MUI
import { Box, Button } from '@mui/material';

// Axios
import axios from "axios";

const LogoutButton = ( { onLogout } ) => {
const dispatch = useDispatch();
  let navigate = useNavigate();

  function logMeOut() {
    axios({
      method: "POST",
      url:"https://sb-backend-6409fb97857a.herokuapp.com/api/logout",
    })
    .then((response) => {
        dispatch(removeToken())
        dispatch(setLoggedIn(false))
        // console.log("ur logged out uwu")
        navigate('/')
    }).catch((error) => {
      if (error.response) {
        // console.log(error.response)
        // console.log(error.response.status)
        // console.log(error.response.headers)
        }
    })}


    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button id="LOGOUT" className="logoutButton" variant="contained" color="primary" onClick={logMeOut}>
            Log out
          </Button>
        </Box>
    )
}

export default LogoutButton;

