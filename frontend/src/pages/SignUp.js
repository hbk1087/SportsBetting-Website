// React
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// API
import axios from "axios";

// Hooks
import useGoogleMapsApi from '../hooks/useGoogleMapsApi';

// MUI
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../css/Login.css';



const SignupGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: '#000000',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(10),
}));

function SignUp() {
    let navigate = useNavigate();

    const routeChangeLogin = () => {
        let path = `/login`;
        navigate(path);
    }

    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
        password: ""
    })

    useEffect(() => {
        document.title = "Algo | Signup"
    }, [])


    const autocompleteRef = useRef();
    const inputRef = useRef();
    const googleMapsApi = useGoogleMapsApi()

    const options = {
      componentRestrictions: { country: "us" }
    };

    useEffect(() => {
      if (googleMapsApi) {
        autocompleteRef.current = new googleMapsApi.places.Autocomplete(inputRef.current, options)
        autocompleteRef.current.addListener('place_changed',  async () => {
          const place = await autocompleteRef.current.getPlace()
  
          setFormData(prevNote => ({...prevNote, address: place['formatted_address']}));
  
    
        })
      }
    }, [googleMapsApi])

    const signMeUp = (event) => {
        event.preventDefault()

      axios({
        method: "POST",
        url:"https://sb-backend-6409fb97857a.herokuapp.com/api/signup",
        data:{
            username: formData.username,
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone_number: formData.phone_number,
            address: formData.address,
            password: formData.password
         }
      })
      .then((response) => {
        if (response.status === 201) {
            // console.log("ur logged in uwu")
            routeChangeLogin()
        } else {
            // console.log("Error signing in wnw")
        }
      }).catch((error) => {
        if (error.response) {
          // console.log(error.response)
          // console.log(error.response.status)
          // console.log(error.response.headers)
          }
      })
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setFormData(prevNote => ({
          ...prevNote, [name]: value})
      )
      // console.log(formData)
    }


      return (
        <div className="signupForm" >
        <SignupGrid container justifyContext="center" alignItems="center" style={{ height: '50vh', paddingTop: '90px'}}>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom justifyContent="center" display="flex">
              Signup
            </Typography>
            <form onSubmit={signMeUp}>
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
                    label="First Name"
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    required
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    inputRef={inputRef}
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
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </SignupGrid>
        </div>
      );
}

export default SignUp;