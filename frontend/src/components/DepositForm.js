import React, { useState } from 'react';
import '../css/DepositForm.css';
// Axios
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux';

// Redux
import { initializeBalance } from '../slices/userSlice';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const DepositForm = ({ onClose, currentBalance }) => {
      // Custom styled button for the Deposit
    const InvalidButton = styled(Button)(({ theme }) => ({
        marginRight: theme.spacing(2),
        backgroundColor: '#fc0202',
        '&:hover': {
        backgroundColor: '#0056b3', // a bit darker on hover
        }
    }));
  const [depositAmount, setDepositAmount] = useState(0);
  // user authentication selectors
  const authToken = useSelector((state) => state.auth.token);
  const balance = useSelector((state) => state.user.balance);

  const dispatch = useDispatch()

  const handleDeposit = (e) => {
    e.preventDefault();
    // Ensure depositAmount is a positive number or zero
    const deposit = parseFloat(depositAmount);
    if (isNaN(deposit) || deposit < 0) {
      alert("Invalid deposit amount. Please enter a positive number or zero.");
      return;
    }

    // Calculate the expected balance by adding the deposit amount to the current balance
    const expectedBalance = Number(currentBalance) + deposit;

    // You can perform further actions here, such as updating the balance in a database or state
    // For this example, we'll just log the expected balance
    // console.log(`Expected Balance after deposit: ${expectedBalance}`);
    axios({
        method: "PATCH",
        url:"https://sb-backend-6409fb97857a.herokuapp.com/api/account",
        headers: {
            Authorization: 'Bearer ' + authToken,
          },
        data:{
          current_balance: expectedBalance.toFixed(2),
         }
      })
      .then((response) => {
        if (response.status === 200) {
            // console.log("balance changed")
            onClose()
            balance = dispatch(initializeBalance(expectedBalance.toFixed(2)))
            
        }
      }).catch((error) => {
        if (error.response) {
          // console.log(error.response)
          // console.log(error.response.status)
          // console.log(error.response.headers)
          }
      })
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <p>Current Balance: ${currentBalance}</p>
        <form onSubmit={handleDeposit}>
          <label style={{ textAlign: 'center' }}>
            Deposit Amount:
            <input
              type="number"
              step="0.01"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              min="1"  // Prevent negative values
            />
          </label>
          <div style={{ textAlign: 'center' }}>
          <button type="submit">Deposit</button>
          </div>
        </form>
        <p>Expected Balance: ${depositAmount === "" ? currentBalance : (Number(currentBalance) + parseFloat(depositAmount)).toFixed(2)}</p>
        <div style={{ textAlign: 'center' }}>
        <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default DepositForm;

