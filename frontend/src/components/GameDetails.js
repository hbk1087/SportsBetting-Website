import React, { Suspense } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { addGameChoiceId, removeGameChoiceId, addActiveBet, removeActiveBet } from '../slices/activeBetSlice';

// MUI
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Components
import * as NFLLogos from 'react-nfl-logos';
import LoadingIndicator from '../util/LoadingIndicator';
import BetBox from "./BetBox"
import TeamSeparator from './TeamSeparator';

// CSS
import "../css/GameDetails.css"

const GameDetails = ({ game }) => {
    // Destructure game properties
    const {
        game_id,
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
        best_bet_edge,
    } = game;

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
    const new_date = formatDate(date)

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

    const NflIcon = styled('img')({
      width: '100%',
      height: '100px',
    })

    const TimeStyle = styled(Typography)({
      fontWeight: 'bold',
      fontSize: '1.2em',
      color: '#ffffff',
    })

    const TeamName = styled(Typography)({
        fontWeight: 'bold',
        fontSize: '1.2em',
        color: '#ffffff',
    })
    
    const getSpreadColor = (spread) => (spread > 0 ? "green" : "red");
    const getMoneyLineColor = (ml) => (ml > 0 ? "green" : "red");


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
      gap: '0px',  // Space between BetBoxes
      justifyContent: 'center',
      alignItems: 'center'
    });

    const DateContainer = styled('div')({
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      gap: '0px',
      justifyContent: 'start',
      alignItems: 'left',
      color: '#ffffff',
      padding: '5px',
      marginLeft: '1%',
      fontWeight: '100',
      fontSize: '0.85em'
    });

    return (
      <StyledGridContainer container spacing={0} alignItems="center" justifyContent="center" style={{borderBottom: '1px solid #869d97'}}>
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
        <DateContainer>{new_date}</DateContainer>
      </StyledGridContainer>
    )
}

export default GameDetails;