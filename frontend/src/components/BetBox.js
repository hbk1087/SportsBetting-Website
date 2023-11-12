// React
import React, { useEffect } from 'react';
import { useState } from 'react';

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
  const hasActiveBets = useSelector((state) => state.activeBets.hasActiveBets)

  // username, bet, wager, potential payout

  const handleBetBoxClick = ({bet_type, game}) => {
    const betExists = bets.find(bet => bet.game.game_id === game.game_id && bet.bet_type === bet_type) ? true : false;

    // console.log(betExists)

    if (betExists) {
      dispatch(removeGameByIdAndType({game_id: game.game_id, bet_type: bet_type}))
    } else {
      dispatch(openActiveBet({bet_type: bet_type, game: game}))  
    }

  }

  const RenderAwaySpreadForm = () => {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
      const betExists = bets.some(bet => bet.game.game_id === game.game_id && bet.bet_type === bet_type);

      setIsClicked(betExists);

      if (!hasActiveBets){
        setIsClicked(false);
      }

    }, [bets, hasActiveBets])

    const containerClassName = isClicked ? 'form-container-clicked' : 'form-container';

    return (
      <div className={containerClassName} onClick={() => {handleBetBoxClick({bet_type, game}); setIsClicked(current => !current)}}>
        <div className='away-spread'>{away_spread < 0 ? away_spread : (away_spread > 0 ? `+${away_spread}` : away_spread)}</div>
        <div className='away-spread-odds'>{away_spread_odds}</div>
      </div>
    );
  };

  const RenderHomeSpreadForm = () => {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
      const betExists = bets.some(bet => bet.game.game_id === game.game_id && bet.bet_type === bet_type);

      setIsClicked(betExists);

      if (!hasActiveBets){
        setIsClicked(false);
      }

    }, [bets, hasActiveBets])

    const containerClassName = isClicked ? 'form-container-clicked' : 'form-container';

    return (
      <div className={containerClassName} onClick={() => {handleBetBoxClick({bet_type, game}); setIsClicked(current => !current)}}>
        <div className='home-spread'>{home_spread < 0 ? home_spread : (home_spread > 0 ? `+${home_spread}` : home_spread)}</div>
        <div className='home-spread-odds'>{home_spread_odds}</div>
      </div>
    );
  };

  const RenderMoneylineAwayForm = () => {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
      const betExists = bets.some(bet => bet.game.game_id === game.game_id && bet.bet_type === bet_type);

      setIsClicked(betExists);

      if (!hasActiveBets){
        setIsClicked(false);
      }

    }, [bets, hasActiveBets])

    const containerClassName = isClicked ? 'form-container-clicked' : 'form-container';

    return (
      <div className={containerClassName} onClick={() => {handleBetBoxClick({bet_type, game}); setIsClicked(current => !current)}}>
        <div className='away-odds'>{away_odds}</div>
      </div>
    );
  }

  const RenderMoneylineHomeForm = () => {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
      const betExists = bets.some(bet => bet.game.game_id === game.game_id && bet.bet_type === bet_type);

      setIsClicked(betExists);

      if (!hasActiveBets){
        setIsClicked(false);
      }

    }, [bets, hasActiveBets])

    const containerClassName = isClicked ? 'form-container-clicked' : 'form-container';

    return (
      <div className={containerClassName} onClick={() => {handleBetBoxClick({bet_type, game}); setIsClicked(current => !current)}}>
        <div className='home-odds'>{home_odds}</div>
      </div>
    );
  }


  const RenderTotalOverForm = () => {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
      const betExists = bets.some(bet => bet.game.game_id === game.game_id && bet.bet_type === bet_type);

      setIsClicked(betExists);

      if (!hasActiveBets){
        setIsClicked(false);
      }

    }, [bets, hasActiveBets])

    const containerClassName = isClicked ? 'form-container-clicked' : 'form-container';

    return (
      <div className={containerClassName} onClick={() => {handleBetBoxClick({bet_type, game}); setIsClicked(current => !current)}}>
        <div className='total'>O {total}</div>
        <div className='over-odds'>{over_odds}</div>
      </div>
    );
  };

  const RenderTotalUnderForm = () => {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
      const betExists = bets.some(bet => bet.game.game_id === game.game_id && bet.bet_type === bet_type);

      setIsClicked(betExists);

      if (!hasActiveBets){
        setIsClicked(false);
      }

    }, [bets, hasActiveBets])

    const containerClassName = isClicked ? 'form-container-clicked' : 'form-container';

    return (
      <div className={containerClassName} onClick={() => {handleBetBoxClick({bet_type, game}); setIsClicked(current => !current)}}>
        <div className='total'>U {total}</div>
        <div className='under-odds'>{under_odds}</div>
      </div>
    );
  }

  let renderedForm;
  switch (bet_type) {
    case 'away_spread':
      renderedForm = RenderAwaySpreadForm();
      break;
    case 'home_spread':
      renderedForm = RenderHomeSpreadForm();
      break;
    case 'moneyline_away':
      renderedForm = RenderMoneylineAwayForm();
      break;
    case 'moneyline_home':
      renderedForm = RenderMoneylineHomeForm();
      break;
    case 'total_over':
      renderedForm = RenderTotalOverForm();
      break;
    case 'total_under':
      renderedForm = RenderTotalUnderForm();
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