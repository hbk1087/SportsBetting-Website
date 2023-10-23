import React, { startTransition, Suspense } from 'react';

import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

import * as NFLLogos from 'react-nfl-logos';
import LoadingIndicator from '../util/LoadingIndicator';

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

    const GameDetailsContainer = styled('div')({
      borderBottom: '1px solid #E0E0E0',
      paddingBottom: '10px',
      marginBottom: '10px',
    });

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
      'Washington Football Team': NFLLogos.WAS,
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

    const TeamLogo = styled('div')(({ isAway }) => ({
      // shared styles for team-logo
      ...(isAway ? {
        // specific styles for away-logo
      } : {
        // specific styles for home-logo
      })
    }));

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

    return (
      <GameDetailsContainer>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
              <NflIcon src="https://static.www.nfl.com/image/upload/v1554321393/league/nvfr7ogywskqrfaiu38m.svg" alt="NFL Logo" />
          </Grid>
          <Grid item>
            <Typography variant="h6">
              {sport === "nfl" ? "NFL" : `${sport} Games`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TimeStyle variant="subtitle1">
              {date}
            </TimeStyle>
          </Grid>
  
          {/* Away team details */}
          <Grid container item spacing={2} alignItems="center">
            <Grid item>
              <TeamComponent teamName={away_team} />
            </Grid>
            <Grid item>
              <TeamName variant="h6">
                {away_team}
              </TeamName>
            </Grid>
            <Grid item style={{ color: getSpreadColor(away_spread) }}>
              {away_spread}
            </Grid>
            <Grid item style={{ color: getMoneyLineColor(away_ml) }}>
              {away_ml}
            </Grid>
            <Grid item>
              O {total} {over_odds}
            </Grid>
          </Grid>
  
          {/* Home team details */}
          <Grid container item spacing={2} alignItems="center">
            <Grid item>
            <TeamComponent teamName={home_team} />
            </Grid>
            <Grid item>
              <TeamName variant="h6">
                {home_team}
              </TeamName>
            </Grid>
            <Grid item style={{ color: getSpreadColor(home_spread) }}>
              {home_spread}
            </Grid>
            <Grid item style={{ color: getMoneyLineColor(home_ml) }}>
              {home_ml}
            </Grid>
            <Grid item>
              U {total} {under_odds}
            </Grid>
          </Grid>
        </Grid>
      </GameDetailsContainer>
    );
}

export default GameDetails;