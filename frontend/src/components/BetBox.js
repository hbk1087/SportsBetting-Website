/*        
        self.account_username = account_username # Account object here
        self.game_id = game_id #GameModel object will go here
        self.bet_type = bet_type
        self.wager = wager
        self.potential_payout = potential_payout
        self.timestamp = timestamp
        self.actual_payout = actual_payout
*/


import React, { useState } from 'react';

function BetBox({
  bet_type,
  away_odds,
  home_odds,
  away_spread,
  away_spread_odds,
  home_spread,
  home_spread_odds,
  total,
  over_odds,
  under_odds,
}) {


  const [bet, setBet] = useState({
    account_username: '',
    game_id: '',
    bet_type: '',
    wager: '',
    potential_payout: '',
    timestamp: '',
    actual_payout: '',
  });

  const renderAwaySpreadForm = () => {
    return (
      <div style={{color: '#ffffff'}}>
        {/* Away odds form components */}
        <div>{away_spread}</div>
        <div>{away_spread_odds}</div>
        {/* Other input fields for this form */}
      </div>
    );
  };

  const renderHomeSpreadForm = () => {
    return (
      <div style={{color: '#ffffff'}}>
        <div>{home_spread}</div>
        <div>{home_spread_odds}</div>
      </div>
    );
  };

  const renderMoneylineAwayForm = () => {
    return (
      <div style={{color: '#ffffff'}}>
        {/* Away odds form components */}
        <div>{away_odds}</div>
        {/* Other input fields for this form */}
      </div>
    );
  }

  const renderMoneylineHomeForm = () => {
    return (
      <div style={{color: '#ffffff'}}>
        {/* Home odds form components */}
        <div>{home_odds}</div>
        {/* Other input fields for this form */}
      </div>
    );
  }


  const renderTotalOverForm = () => {
    return (
      <div style={{color: '#ffffff'}}>
        {/* Total form components */}
        <div>O {total}</div>
        <div>{over_odds}</div>
        {/* Other input fields for this form */}
      </div>
    );
  };

  const renderTotalUnderForm = () => {
    return (
      <div style={{color: '#ffffff'}}>
        {/* Total form components */}
        <div>U {total}</div>
        <div>{under_odds}</div>
        {/* Other input fields for this form */}
      </div>
    );
  }

  let renderedForm;
  switch (bet_type) {
    case 'away_spread':
      renderedForm = renderAwaySpreadForm();
      break;
    case 'home_spread':
      renderedForm = renderHomeSpreadForm();
      break;
    case 'moneyline_away':
      renderedForm = renderMoneylineAwayForm();
      break;
    case 'moneyline_home':
      renderedForm = renderMoneylineHomeForm();
      break;
    case 'total_over':
      renderedForm = renderTotalOverForm();
      break;
    case 'total_under':
      renderedForm = renderTotalUnderForm();
      break;
    default:
      renderedForm = null;
      break;
  }

  // Render your component
  // depending on the prop, display a different form
  /* away_odds,
        home_odds,
        away_spread,
        away_spread_odds,
        home_spread,
        home_spread_odds,
        total,
        over_odds,
        under_odds */

  return (
  <div>
    {renderedForm}
  </div>
  );

}


export default BetBox;