import '../css/BoxGrid.css';

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
      <div className='form-container'>
        <div className='away-spread'>{away_spread < 0 ? away_spread : (away_spread > 0 ? `+${away_spread}` : away_spread)}</div>
        <div className='away-spread-odds'>{away_spread_odds}</div>
      </div>
    );
  };

  const renderHomeSpreadForm = () => {
    return (
      <div className='form-container'>
        <div className='home-spread'>{home_spread < 0 ? home_spread : (home_spread > 0 ? `+${home_spread}` : home_spread)}</div>
        <div className='home-spread-odds'>{home_spread_odds}</div>
      </div>
    );
  };

  const renderMoneylineAwayForm = () => {
    return (
      <div className='form-container'>
        <div className='away-odds'>{away_odds}</div>
      </div>
    );
  }

  const renderMoneylineHomeForm = () => {
    return (
      <div className='form-container'>
        <div className='home-odds'>{home_odds}</div>
      </div>
    );
  }


  const renderTotalOverForm = () => {
    return (
      <div className='form-container'>
        <div className='total'>O {total}</div>
        <div className='over-odds'>{over_odds}</div>
      </div>
    );
  };

  const renderTotalUnderForm = () => {
    return (
      <div className='form-container'>
        <div className='total'>U {total}</div>
        <div className='under-odds'>{under_odds}</div>
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