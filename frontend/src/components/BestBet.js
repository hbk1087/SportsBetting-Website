import React from 'react'

// MUI
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

function BestBet({ best_bet_type, best_bet_edge }) {

    function prettyBetType() {
        if (best_bet_type === 'Home') {
            return ""
        }
    }
  return (
    <div>
    <div>{best_bet_type}</div>
    <div>{best_bet_edge} Point Edge</div>
    </div>
  )
}

export default BestBet;