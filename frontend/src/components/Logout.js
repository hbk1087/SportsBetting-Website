import axios from "axios";
import { Box, Button } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { setToken, removeToken, initializeToken, setLoggedIn } from '../slices/authSlice'

import "../css/LogoutButton.css"

function Logout() {

  const dispatch = useDispatch();

  function logMeOut() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
        dispatch(removeToken())
        dispatch(setLoggedIn(false))
        console.log("ur logged out uwu")
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button id="LOGOUT" className="logoutButton" variant="contained" color="primary" onClick={logMeOut}>
            Log out
          </Button>
        </Box>
      );
}

export default Logout;