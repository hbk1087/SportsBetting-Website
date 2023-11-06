// React
import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { openActiveBet, removeGameByIdAndType } from '../slices/activeBetSlice';

// CSS
import '../css/BoxGrid.css';

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
  game,
}) {

  const dispatch = useDispatch();
  const bets = useSelector((state) => state.activeBets.bets);

  const handleBetBoxClick = ({bet_type, game}) => {
    const betExists = bets.find(bet => bet.game.game_id === game.game_id && bet.bet_type === bet_type) ? true : false;

    console.log(betExists)

    if (betExists) {
      dispatch(removeGameByIdAndType({game_id: game.game_id, bet_type: bet_type}))
    } else {
      dispatch(openActiveBet({bet_type, game}))  
    }
  }

  const renderAwaySpreadForm = () => {
    return (
      <div className='form-container' onClick={() => handleBetBoxClick({bet_type, game})}>
        <div className='away-spread'>{away_spread < 0 ? away_spread : (away_spread > 0 ? `+${away_spread}` : away_spread)}</div>
        <div className='away-spread-odds'>{away_spread_odds}</div>
      </div>
    );
  };

  const renderHomeSpreadForm = () => {
    return (
      <div className='form-container' onClick={() => handleBetBoxClick({bet_type, game})}>
        <div className='home-spread'>{home_spread < 0 ? home_spread : (home_spread > 0 ? `+${home_spread}` : home_spread)}</div>
        <div className='home-spread-odds'>{home_spread_odds}</div>
      </div>
    );
  };

  const renderMoneylineAwayForm = () => {
    return (
      <div className='form-container' onClick={() => handleBetBoxClick({bet_type, game})}>
        <div className='away-odds'>{away_odds}</div>
      </div>
    );
  }

  const renderMoneylineHomeForm = () => {
    return (
      <div className='form-container' onClick={() => handleBetBoxClick({bet_type, game})}>
        <div className='home-odds'>{home_odds}</div>
      </div>
    );
  }


  const renderTotalOverForm = () => {
    return (
      <div className='form-container' onClick={() => handleBetBoxClick({bet_type, game})}>
        <div className='total'>O {total}</div>
        <div className='over-odds'>{over_odds}</div>
      </div>
    );
  };

  const renderTotalUnderForm = () => {
    return (
      <div className='form-container' onClick={() => handleBetBoxClick({bet_type, game})}>
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