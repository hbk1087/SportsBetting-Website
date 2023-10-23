import axios from "axios";
import { Box, Button } from '@mui/material';

import { useDispatch } from 'react-redux';
import { setToken, removeToken, initializeToken, setLoggedIn } from '../slices/authSlice'

import { useNavigate } from "react-router-dom";

import "../css/LogoutButton.css"

function Logout() {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const routeChangeHome = () => {
    let path = `/`;
    navigate(path);
}

  function logMeOut() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
        dispatch(removeToken())
        dispatch(setLoggedIn(false))
        console.log("ur logged out uwu")
        routeChangeHome()
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