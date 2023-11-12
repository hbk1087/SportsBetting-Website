import React, { Suspense } from 'react';

// MUI
import { Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Components
import * as NFLLogos from 'react-nfl-logos';
import * as NBALogos from 'react-nba-logos';
import LoadingIndicator from '../util/LoadingIndicator';
import BetBox from "./BetBox"
import TeamSeparator from './TeamSeparator';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { removeGameByIdAndType, openActiveBet } from '../slices/activeBetSlice';

// CSS
import "../css/GameDetails.css"



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

const teamToComponent = {
  'San Francisco 49ers': NFLLogos.SF,
  'Arizona Cardinals': NFLLogos.ARI,
  'Atlanta Falcons': NFLLogos.ATL,
  'Baltimore Ravens': NFLLogos.BAL,
  'Buffalo Bills': NFLLogos.BUF,
  'Carolina Panthers': NFLLogos.CAR,
  'Chicago Bears': NFLLogos.CHI,
  'Cincinnati Bengals': NFLLogos.CIN,
  'Cleveland Browns': NFLLogos.CLE,
  'Dallas Cowboys': NFLLogos.DAL,
  'Denver Broncos': NFLLogos.DEN,
  'Detroit Lions': NFLLogos.DET,
  'Green Bay Packers': NFLLogos.GB,
  'Houston Texans': NFLLogos.HOU,
  'Indianapolis Colts': NFLLogos.IND,
  'Jacksonville Jaguars': NFLLogos.JAX,
  'Kansas City Chiefs': NFLLogos.KC,
  'Los Angeles Chargers': NFLLogos.LAC,
  'Los Angeles Rams': NFLLogos.LAR,
  'Las Vegas Raiders': NFLLogos.LV,
  'Miami Dolphins': NFLLogos.MIA,
  'Minnesota Vikings': NFLLogos.MIN,
  'New England Patriots': NFLLogos.NE,
  'New Orleans Saints': NFLLogos.NO,
  'New York Giants': NFLLogos.NYG,
  'New York Jets': NFLLogos.NYJ,
  'Philadelphia Eagles': NFLLogos.PHI,
  'Pittsburgh Steelers': NFLLogos.PIT,
  'Seattle Seahawks': NFLLogos.SEA,
  'Tampa Bay Buccaneers': NFLLogos.TB,
  'Tennessee Titans': NFLLogos.TEN,
  'Washington Commanders': NFLLogos.WAS,
  'Atlanta Hawks': NBALogos.ATL,
  'Brooklyn Nets': NBALogos.BKN,
  'Boston Celtics': NBALogos.BOS,
  'Charlotte Hornets': NBALogos.CHA,
  'Chicago Bulls': NBALogos.CHI,
  'Cleveland Cavaliers': NBALogos.CLE,
  'Dallas Mavericks': NBALogos.DAL,
  'Denver Nuggets': NBALogos.DEN,
  'Detroit Pistons': NBALogos.DET,
  'Golden State Warriors': NBALogos.GSW,
  'Houston Rockets': NBALogos.HOU,
  'Indiana Pacers': NBALogos.IND,
  'Los Angeles Clippers': NBALogos.LAC,
  'Los Angeles Lakers': NBALogos.LAL,
  'Memphis Grizzlies': NBALogos.MEM,
  'Miami Heat': NBALogos.MIA,
  'Milwaukee Bucks': NBALogos.MIL,
  'Minnesota Timberwolves': NBALogos.MIN,
  'New Orleans Pelicans': NBALogos.NOP,
  'New York Knicks': NBALogos.NYK,
  'Oklahoma City Thunder': NBALogos.OKC,
  'Orlando Magic': NBALogos.ORL,
  'Philadelphia 76ers': NBALogos.PHI,
  'Phoenix Suns': NBALogos.PHX,
  'Portland Trail Blazers': NBALogos.POR,
  'Sacramento Kings': NBALogos.SAC,
  'San Antonio Spurs': NBALogos.SAS,
  'Toronto Raptors': NBALogos.TOR,
  'Utah Jazz': NBALogos.UTA,
  'Washington Wizards': NBALogos.WAS,
};


function TeamComponent({ teamName }) {
  // Check if teamName is a valid key in the mapping
  if (teamName in teamToComponent) {
    const Component = teamToComponent[teamName];

    return (
      <Suspense fallback={<LoadingIndicator />}>
        <Component />
      </Suspense>
    );
  } else {
    // Handle the case where teamName is not in the mapping
    return <div>Invalid team name</div>;
  }
}

const TeamName = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '1.2em',
    color: '#ffffff',
})

const getSpreadColor = (spread) => (spread > 0 ? "green" : "red");


const StyledGridContainer = styled(Grid)({
  display: 'flex',
  flexWrap: 'wrap',
});

const StyledBetBox = styled(BetBox)({
  color: '#ffffff',
  border: '2px solid #E0E0E0',
  borderRadius: '5px',  // Adjusted to match your image
  width: '50px',
  height: '80px',
  flexDirection: 'column',  // Stack content vertically
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
});

const LogoContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',  // Space between logos
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: '50px',
});

const NameContainer = styled(Grid)({
  minWidth: '300px',
  display: 'flex',
  flexDirection: 'column',
  gap: '70px',  // Space between names
  justifyContent: 'center',
  alignItems: 'center'
});

const BetOptionsContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',  // Space between TeamBetContainers
  alignContent: 'center',
  justifyContent: 'center',
});

const TeamBetContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
});

const BottomContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  gap: '0px',
  justifyContent: 'start',
  color: '#ffffff',
  marginLeft: '1%',
  fontSize: '0.85em'
});

const DateContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  gap: '0px',
  justifyContent: 'start',
  alignItems: 'flex-end',
  color: '#ffffff',
  marginLeft: '1%',
  marginBottom: '2%',
  fontWeight: '100',
  fontSize: '1em',
  flexWrap: 'wrap'
});

const BestBetContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  gap: '0px',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: '#ffffff',
  marginLeft: '31.5%',
  fontWeight: '150',
  marginRight: '2%',
  marginBottom: '2%',
  width: '175px'
});

const BestBetButton = styled(Button)(({ isClicked }) => ({
  fontSize: '1em',
  color: 'green',
  border: '2px solid',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '2px',
  paddingBottom: '8px',
  paddingTop: '8px',
  width: '124px',
  maxHeight: '70px',
  backgroundColor: isClicked ? 'green' : 'transparent', // TODO: Implement isClicked state
  '&:hover': {
      backgroundColor: 'green',
      color: 'white'
  },
}));

const BestBetText = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2em',
  color: '#ffffff',
  alignText: 'center',
  justifyContent: 'center'
})

const EdgeText = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2em',
  color: '#008001',
  alignText: 'center',
  justifyContent: 'center'
})

const WordsContainer = styled(Grid)({
  display: 'flex',
  alignText: 'center',
  justifyContent: 'space-between',
  flexGrow: 1,
  flexDirection: 'row',
  paddingRight: '6%'
})

const LogoDateContainer = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  flexDirection: 'row',
  width: '25%',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  paddingBottom: '1%',
  paddingLeft: '1%'
})

const GameDetails = ({ game }) => {
    // Destructure game properties
    const {
        date,
        sport,
        away_team,
        home_team,
        away_odds,
        home_odds,
        away_spread,
        away_spread_odds,
        home_spread,
        home_spread_odds,
        total,
        over_odds,
        under_odds,
        best_bet_type,
        best_bet_edge
    } = game;

    const dispatch = useDispatch();
    const bets = useSelector((state) => state.activeBets.bets);
    const hasActiveBets = useSelector((state) => state.activeBets.hasActiveBets)

    const handleBestBetClick = ({bet_type, game}) => {
      // console.log("best bet type: ", bet_type, " and game: ", game);

      const betExists = bets.find(bet => bet.game.game_id === game.game_id && bet.bet_type === bet_type) ? true : false;
  
      // console.log(betExists)
  
      if (betExists) {
        dispatch(removeGameByIdAndType({game_id: game.game_id, bet_type: bet_type}))
      } else {
        dispatch(openActiveBet({bet_type: bet_type, game: game}))  
      }
  
    }

    function getBestBet(b) {
      let name = ""
            if (b === "Home") {
                name = home_team + " Money Line"
            } else if (b === "Away") {
                name = away_team + " Money Line"
            } else if (b === "Home Line") {
                if (home_spread > 0){
                  name = home_team + " +" + home_spread
                } else {
                name = home_team + " " + home_spread
                }
            } else if (b === "Away Line") {
              if (away_spread > 0){
                name = away_team + " +" + away_spread
              } else {
              name = away_team + " " + away_spread
              }
            } else if (b === "Over") {
                name =  "Over " + total
            } else if (b === "Under") {
                name =  "Under " + total
            }   
            return name
    }

    function convertBackToOriginalBetType(betTypeName) {
      switch (betTypeName) {
          case "Home":
              return "moneyline_home";
          case "Away":
              return "moneyline_away";
          case "Home Line":
              return "home_spread";
          case "Away Line":
              return "away_spread";
          case "Over":
              return "total_over";
          case "Under":
              return "total_under";
          default:
              return "Unknown Bet Type";
      }
  }

    const bb = getBestBet(best_bet_type);
    const new_date = formatDate(date);

    return (
      <StyledGridContainer container spacing={0} alignItems="center" justifyContent="center" style={{borderBottom: '1px solid #2f2d2f'}}>
        <TeamSeparator />
        <LogoContainer>
          <TeamComponent teamName={away_team} />
          <TeamComponent teamName={home_team} />
        </LogoContainer>

        <NameContainer>
          <TeamName variant="h6">{away_team}</TeamName>
          <TeamName variant="h6">{home_team}</TeamName>
        </NameContainer>

        <BetOptionsContainer>
          <TeamBetContainer>
            <StyledBetBox bet_type={'away_spread'} away_spread={away_spread} away_spread_odds={away_spread_odds} game={game}/>
            <StyledBetBox bet_type={'moneyline_away'} away_odds={away_odds} game={game}/>
            <StyledBetBox bet_type={'total_over'} total={total} over_odds={over_odds} game={game}/>
          </TeamBetContainer>

          <TeamBetContainer>
            <StyledBetBox bet_type={'home_spread'} home_spread={home_spread} home_spread_odds={home_spread_odds} color={getSpreadColor(home_spread)} game={game}/>
            <StyledBetBox bet_type={'moneyline_home'} home_odds={home_odds} game={game}/>
            <StyledBetBox bet_type={'total_under'} total={total} under_odds={under_odds} game={game}/>
          </TeamBetContainer>
        </BetOptionsContainer>
        <BottomContainer>
          <LogoDateContainer>
          {sport === 'nfl' ? (
            <img
              src={'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png'}
              className="list-item-image"
            />
          ) : (
            <img
              src={'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/National_Basketball_Association_logo.svg/105px-National_Basketball_Association_logo.svg.png'}
              className="list-item-image"
            />
          )}
              <DateContainer>{new_date}</DateContainer>
          </LogoDateContainer>
          <BestBetContainer>
              <WordsContainer>
                <EdgeText> {best_bet_edge} Point Edge </EdgeText>
                <BestBetText> Best Bet: </BestBetText>
              </WordsContainer>
              <BestBetButton onClick={() => handleBestBetClick({bet_type: convertBackToOriginalBetType(best_bet_type), game: game})}>{bb}</BestBetButton>
          </BestBetContainer>
        </BottomContainer>
      </StyledGridContainer>
    )
}

export default GameDetails;