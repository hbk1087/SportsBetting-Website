import React, { useState } from 'react';
import '../css/WithdrawForm.css';

// Axios
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux';

// Redux
import { initializeBalance } from '../slices/userSlice';

const WithdrawForm = ({ onClose, currentBalance }) => {    
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  // user authentication selectors
  const authToken = useSelector((state) => state.auth.token);
  const balance = useSelector((state) => state.user.balance);

  const dispatch = useDispatch()


  const handleWithdraw = (e) => {
    e.preventDefault();
    // Ensure withdrawAmount is a positive number or zero
    const withdraw = parseFloat(withdrawAmount);
    if (isNaN(withdraw) || withdraw < 0) {
      alert("Invalid withdraw amount. Please enter a positive number or zero.");
      return;
    }
    if (currentBalance - withdraw < 0) {
      alert("Invalid withdraw amount. Not enough funds in balance.");
      return;
    }

    // Calculate the expected balance by adding the withdraw amount to the current balance
    const expectedBalance = currentBalance - withdraw;

    // You can perform further actions here, such as updating the balance in a database or state
    // For this example, we'll just log the expected balance
    // console.log(`Expected Balance after withdraw: ${expectedBalance}`);
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
        <form onSubmit={handleWithdraw}>
          <label style={{ textAlign: 'center' }}>
            Withdraw Amount:
            <input
              type="number"
              step="0.01"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              min="1"  // Prevent negative values
            />
          </label>
          <div style={{ textAlign: 'center' }}>
          <button type="submit">Withdraw</button>
          </div>
        </form>
        <p>Expected Balance: ${withdrawAmount === "" ? currentBalance : (currentBalance - parseFloat(withdrawAmount)).toFixed(2)}</p>
        <div style={{ textAlign: 'center' }}>
        <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawForm;

