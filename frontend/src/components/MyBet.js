import React from 'react'
import { Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import "../css/MyBet.css"

const StyledGridContainer = styled(Grid)({
    display: 'flex',
    flexWrap: 'nowrap',
    border: '1px',
    borderColor: '#aaaaaa',
    columns: '16',
    flexDirection: 'column'
  });

const DateContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    gap: '0px',
    justifyContent: 'start',
    alignItems: 'left',
    color: '#ffffff',
    marginLeft: '1%',
    fontWeight: '100',
    fontSize: '0.85em'
  });

const MainContainer = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',  // Space between logos
    alignItems: 'center',
    flexGrow: 1
  });

const WagerContainer = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',  // Space between logos
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '50px',
  });

const SecondaryContainer = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',  // Space between logos
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '50px',
  });

const BetName = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '1.2em',
    color: '#000000',
})

const BetTypeName = styled(Typography)({
    fontWeight: 'lighter',
    fontSize: '1.2em',
    color: '#aaaaaa',
})

const BetInfoContainer = styled(Grid)({
    // minWidth: '95%',
    display: 'flex',
    flexDirection: 'row',  
    justifyContent: 'flex-start',
    alignItems: 'center',
  });

const BetNameContainer = styled(Grid)({
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-start',
    flexGrow: 1,
  });

  const OddsContainer = styled(Grid)({
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',  // Space between names
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  });

function MyBet({ bet }) {
    const { 
        sport,
        away_team, 
        home_team, 
        away_score, 
        home_score, 
        bet_type, 
        odds, 
        points, 
        wager, 
        potential_payout, 
        actual_payout, 
        timestamp,
        game_date 
    }  = bet;

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
      const bet_date = formatDate(timestamp)
      const game_time = formatDate(game_date)
    
    function getBetName(b) {
         let name = ""
        if (b === "Home") {
            name = home_team
        } else if (b === "Away") {
            name = away_team
        } else if (b === "Home Line") {
            name = home_team + " " + points
        } else if (b === "Away Line") {
            name = away_team + " " + points
        } else if (b === "Over") {
            name =  "Over " + points
        } else if (b === "Under") {
            name =  "Under " + points
        }

        
        return name
    }

    function getBetTypeName(b) {
        let name = ""
        if (b === "Home") {
            name = points
        } else if (b === "Away") {
            name = points
        } else if (b === "Home Line") {
            name = "Spread"
        } else if (b === "Away Line") {
            name = "Spread"
        } else if (b === "Over") {
            name =  "Total Points"
        } else if (b === "Under") {
            name =  "Total Points"
        }

        
        return name
    }


    
    const bet_name = getBetName(bet_type)
    const bet_type_name = getBetTypeName(bet_type)

  return (
    <StyledGridContainer>
    
        
        <MainContainer className='main-container'>
            <BetInfoContainer className='betInfo-container'>
                <BetNameContainer className='betName-container'>
                    <BetName variant="h6">{bet_name}</BetName>
                    <BetTypeName variant="h6">{bet_type_name}</BetTypeName>
                </BetNameContainer>
                <OddsContainer className='odds-container'>
                    <BetName variant="h6">{odds}</BetName>
                </OddsContainer>
            </BetInfoContainer>

            <div>
                <p>{away_team} @ {home_team}</p>
                <p>{game_time}</p>
            </div>
        </MainContainer>

        {away_score !== null && (
                <p>Away Score: {away_score}</p>
            )}
            
        {home_score !== null && (
                <p>Home Score: {home_score}</p>
            )}


        <WagerContainer>
            <p>Wager: {wager}</p>
            <p className={actual_payout !== null && actual_payout > 0 ? 'green-text' : actual_payout !== null && actual_payout <= 0 ? 'red-text' : null}>
            {actual_payout !== null
                ? 'Payout: ' + actual_payout
                : 'Potential Payout: ' + potential_payout}
            </p>
        </WagerContainer>
        

        <SecondaryContainer>
            <p>Sport: {sport}</p>
            <p>Placed: {bet_date}</p>
        </SecondaryContainer>
        
        
    
    </StyledGridContainer>
  )
}

export default MyBet;