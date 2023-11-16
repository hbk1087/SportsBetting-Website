import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// API
import axios from "axios";

// Redux
import { useDispatch } from 'react-redux';
import { setToken, setLoggedIn } from '../slices/authSlice'
import { setUsername } from '../slices/userSlice';

// MUI
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import '../css/Login.css';

function Login() {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const routeChangeHome = () => {
        let path = `/`;
        navigate(path);
    }

    const [formData, setFormData] = useState({
      username: "",
      password: ""
    })

    useEffect(() => {
        document.title = "Algo | Login"
    }, [])

    const logMeIn = (event) => {
        event.preventDefault()

      axios({
        method: "POST",
        url:"https://sb-backend-6409fb97857a.herokuapp.com/api/token",
        data:{
          username: formData.username,
          password: formData.password
         }
      })
      .then((response) => {
        if (response.status === 200) {
            dispatch(setToken(response.data.access_token))
            dispatch(setLoggedIn(true))
            dispatch(setUsername(formData.username))

            routeChangeHome()
        }
      }).catch((error) => {
        if (error.response) {
          // console.log(error.response)
          // console.log(error.response.status)
          // console.log(error.response.headers)
          alert("Wrong User Information")
          }
      })
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setFormData(prevNote => ({
          ...prevNote, [name]: value})
      )}

      return (
        <div className="loginForm">
        <Grid container justifyContent="center" alignItems="center" style={{ height: '50vh', paddingTop: '90px' }}>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom justifyContent="center" display="flex">
              Login
            </Typography>
            <form onSubmit={logMeIn}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item justifyContent="center" display="flex">
                  <Button type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </Grid>
                <Grid item justifyContent="center" display="flex" style={{ paddingTop: '10%' }}>
                  <Typography gutterBottom justifyContent="center" display="flex">
                    Don't have an account? &nbsp; <a href="/signup">Sign up here</a>
                  </Typography>
                </Grid>
              </Grid>
            </form>
            
          </Paper>
        </Grid>
        </div>
      );
}

export default Login;