import { useState } from 'react'
import axios from "axios";


import { useSelector, useDispatch } from 'react-redux';
import { setToken, removeToken, initializeToken, setLoggedIn } from '../slices/authSlice'

import '../css/Account.css';

function Account(props) {

  const [accountData, setAccountData] = useState(null)

    const dispatch = useDispatch();
    const authToken = useSelector((state) => state.auth.token);

  function getData() {
    axios({
      method: "GET",
      url:"/account",
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response) => {
      const res = response.data
      res.access_token && dispatch(setToken(res.access_token))
      setAccountData(({
        account_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  return (
    <div className="account">

        <p>To get your account details: </p><button id="getAccountButton" onClick={getData}>Click me</button>
        {accountData && <div>
              <p>Account name: {accountData.account_name}</p>
              <p>About me: {accountData.about_me}</p>
            </div>
        }

    </div>
  );
}

export default Account;