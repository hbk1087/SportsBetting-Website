import { useState, useEffect } from 'react'
import axios from "axios";


import { useSelector, useDispatch } from 'react-redux';
import { setToken, removeToken, initializeToken, setLoggedIn } from '../slices/authSlice'

import '../css/Account.css';

function Account() {

  const [accountData, setAccountData] = useState(null)

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    getData();
  }, []);
    
  function getData() {
    console.log(authToken)
    axios({
      method: "GET",
      url:"/account",
      headers: {
        Authorization: 'Bearer ' + authToken
      }
    })
    .then((response) => {
      const res = response.data
      console.log(res)
      setAccountData((res))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

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