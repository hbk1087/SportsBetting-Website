import React from 'react'
import { Typography, Paper, Grid } from '@mui/material';
import "../css/MyBet.css"

function MyBet({ bet }) {
    const { 
        sport,
        away_team, 
        home_team, 
        away_score, 
        home_score, 
        type, 
        odds, 
        points, 
        wager, 
        potential_payout, 
        actual_payout, 
        timestamp,
        game_date 
    }  = bet;

    function formatDate(inputDate) {
        // Parse the input date string
        const inputDateObj = new Date(inputDate);
      
        // Define an array with month names
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
      
        // Extract the date components
        const day = inputDateObj.getDate();
        const month = monthNames[inputDateObj.getMonth()];
        const hours = inputDateObj.getHours();
        const minutes = inputDateObj.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
      
        // Convert hours from 24-hour format to 12-hour format
        const displayHours = hours % 12 || 12;
      
        // Ensure minutes are displayed with two digits
        const displayMinutes = minutes.toString().padStart(2, '0');
      
        // Determine the time zone (ET for Eastern Time)
        const timeZone = "ET";
      
        // Construct the formatted date string
        const formattedDate = `${month} ${day}, ${displayHours}:${displayMinutes} ${ampm} ${timeZone}`;
      
        return formattedDate;
      }
      const bet_date = formatDate(timestamp)
      const game_time = formatDate(game_date)

  return (
    <div className='bet'>
        <p>Sport: {sport}</p>
        <p>Away Team: {away_team}</p>
        <p>Home Team: {home_team}</p>

        {away_score !== null && (
                <p>Away Score: {away_score}</p>
            )}
            
        {home_score !== null && (
                <p>Home Score: {home_score}</p>
            )}

        <p>Type: {type}</p>
        <p>Odds: {odds}</p>
        <p>Points: {points}</p>
        <p>Wager: {wager}</p>
        <p className={actual_payout !== null && actual_payout > 0 ? 'green-text' : actual_payout !== null && actual_payout <= 0 ? 'red-text' : null}>
        {actual_payout !== null
            ? 'Payout: ' + actual_payout
            : 'Potential Payout: ' + potential_payout}
        </p>

        <p>Bet Placed: {bet_date}</p>
        <p>Game Date: {game_time}</p>

    </div>
  )
}

export default MyBet;