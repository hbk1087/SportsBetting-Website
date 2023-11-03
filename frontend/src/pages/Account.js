import { useState, useEffect } from 'react'
import axios from "axios";

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setToken, setLoggedIn } from '../slices/authSlice'


import '../css/Account.css';

function Account() {

  const [accountData, setAccountData] = useState(null)

  const dispatch = useDispatch();

  // user authentication selectors
  const authToken = useSelector((state) => state.auth.token);
  const authLoggedIn = useSelector((state) => state.auth.loggedIn);

  // user data selectors
  const username = useSelector((state) => state.user.username);

  const navigate = useNavigate();

useEffect(() => {
  document.title = "Account"

  if (!authLoggedIn) {
    // Not allowed to access page - output status message and redirect to login page.
    console.log("You are not logged in");
    dispatch(setLoggedIn(false));
    localStorage.removeItem("loggedIn");

    // ...same with token
    dispatch(setToken(null));
    localStorage.removeItem("token");

    // actually redirect
    navigate("/login");

    return; // stop the execution of the effect here - important!
  }

  axios({
    method: "GET",
    url: "/api/account",
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
  })
  .then((response) => {
    const res = response.data;
    console.log(res);
    setAccountData(res);
  })
  .catch((error) => {
    if (error.response) {
      console.log(error.response);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  });
}, [authLoggedIn, authToken, dispatch, navigate]); // added dependencies

  return (
    <div className="account">

        {accountData && <div>
              <p>Username: {accountData.username}</p>
              <p>First Name: {accountData.first_name}</p>
              <p>Last Name: {accountData.last_name}</p>
              <p>Email: {accountData.email}</p>
              <p>Address: {accountData.address}</p>
              <p>Phone Number: {accountData.phone_number}</p>
              <p>Lifetime Winnings: {accountData.lifetime_winnings}</p>
              <p>Current Balance: {accountData.current_balance}</p>
              
            </div>
        }

    </div>
  );
}

export default Account;