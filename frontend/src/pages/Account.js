// React
import { useState, useEffect } from 'react'
import axios from "axios";

// Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setLoggedIn } from '../slices/authSlice'

// MUI
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Components
import DepositForm from '../components/DepositForm';
import WithdrawForm from '../components/WithdrawForm';
import LoadingIndicator from '../util/LoadingIndicator';

// CSS
import '../css/Account.css';

function Account() {

  // Loading symbol state
  const [loading, setLoading] = useState(true)
  // Custom styled button for the Deposit
const DepositButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  backgroundColor: '#007BFF',
  '&:hover': {
    backgroundColor: '#0056b3', // a bit darker on hover
  }
}));

// Custom styled button for the Withdraw Button
const WithdrawButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#28A745',
  '&:hover': {
  backgroundColor: '#1f7a33', // a bit darker on hover
  }
}));

  // Deposit popup
  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  // Withdraw popup
  const [isPopupOpen2, setPopupOpen2] = useState(false);

  const togglePopup2 = () => {
    setPopupOpen2(!isPopupOpen2);
  };


  const [accountData, setAccountData] = useState(null)

  const dispatch = useDispatch();

  // user authentication selectors
  const authToken = useSelector((state) => state.auth.token);
  const authLoggedIn = useSelector((state) => state.auth.loggedIn);

  // user data selectors
  const username = useSelector((state) => state.user.username);
  const balance = useSelector((state) => state.user.balance);

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
    // dispatch(initializeBalance(accountData.current_balance))
  })
  .catch((error) => {
    if (error.response) {
      console.log(error.response);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  }).finally(() => {
    setLoading(false)
  });  
}, [authLoggedIn, authToken, balance]); 

  return (
    
    <div className='pagecontent'>
      <div className="account">
        
      {loading ? (
                <LoadingIndicator text={'Loading Account Details...'} margtop={'10px'} wid={'900px'}/>
            ) : (accountData && <div>
              <div className='account-contents'>
                <p>
                  <span className="before-curly">Username: </span> {accountData.username}
                </p>
                <p>
                  <span className="before-curly">First Name: </span> {accountData.first_name}
                </p>
                <p>
                  <span className="before-curly">Last Name: </span> {accountData.last_name}
                </p>
                <p>
                  <span className="before-curly">Email: </span> {accountData.email}
                </p>
                <p>
                  <span className="before-curly">Address: </span> {accountData.address}
                </p>
                <p>
                  <span className="before-curly">Phone Number: </span> {accountData.phone_number}
                </p>
                <p>
                  <span className="before-curly">Lifetime Winnings: </span> $&nbsp;<span style={{ color: accountData.lifetime_winnings >= 0 ? 'green' : 'red' }}> { accountData.lifetime_winnings}</span>
                </p>
                <p>
                  <span className="before-curly">Current Balance: </span> $ {accountData.current_balance}
                </p>
              </div>
            
      
          <div className='buttons'>
          <DepositButton className='trans-buttons' color="white" onClick={togglePopup}>Deposit</DepositButton>
          {isPopupOpen && <DepositForm currentBalance={accountData.current_balance} onClose={togglePopup} />}
          
          <WithdrawButton className='trans-buttons' color="white" onClick={togglePopup2}>Withdraw</WithdrawButton>
          {isPopupOpen2 && <WithdrawForm currentBalance={accountData.current_balance} onClose={togglePopup2} />}
          </div>
        </div> )}
      </div>
    </div>
  );
}

export default Account;