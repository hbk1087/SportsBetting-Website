import "../css/GameDetails.css"

const GameOddsHeader = ({sportName}) => {

    return (
        <header className="game-odds-header">
            <div className="sport-name">
                <h4>{sportName}</h4>
            </div>
            <div className="betting-terms">
                <h4 className="spread-header">Spread</h4>
                <h4 className="moneyline-header">Money</h4>
                <h4 className="total-header">Total</h4>
                
            </div>
            {/* <div className="best-bet">
                <h4 className="best-bet-header">Best Bet</h4>
            </div> */}
        </header>
    )
    
}


export default GameOddsHeader;