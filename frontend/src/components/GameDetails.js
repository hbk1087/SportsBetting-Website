import SportsFootballIcon from '@mui/icons-material/SportsFootball';

const GameDetails = ({ game }) => {
    // Destructure game properties
    const {
        game_id,
        date,
        sport,
        away_team,
        home_team,
        away_ml,
        home_ml,
        away_spread,
        away_spread_odds,
        home_spread,
        home_spread_odds,
        total,
        over_odds,
        under_odds,
        best_bet_type,
        best_bet_edge,
    } = game;


    return (
        <div className="gameDetails-container">
          <div className="gameDetails-header">
            <span>{game.sport} Games</span>
            <div>{game.date}</div>
          </div>
          
          <div className="team">
            <div>
              <span className="team-name">{game.away_team}</span>
              <div className="betting">
                <span className={game.away_spread > 0 ? "betting-positive" : "betting-negative"}>
                  {game.away_spread}
                </span>
                <span className={game.away_ml > 0 ? "betting-positive" : "betting-negative"}>
                  {game.away_ml}
                </span>
                <span>{game.total}</span>
              </div>
            </div>
          </div>
    
          <div className="team">
            <div>
              <span className="team-name">{game.home_team}</span>
              <div className="betting">
                <span className={game.home_spread > 0 ? "betting-positive" : "betting-negative"}>
                  {game.home_spread}
                </span>
                <span className={game.home_ml > 0 ? "betting-positive" : "betting-negative"}>
                  {game.home_ml}
                </span>
                <span>{game.total}</span>
              </div>
            </div>
          </div>
        </div>
      );
}



export default GameDetails;