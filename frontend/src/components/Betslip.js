// React
import { React, useEffect } from 'react';

// Router
import { useNavigate } from "react-router-dom";

// MUI
import { Button, Grid, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Components
import BetslipBet from './BetslipBet';
import SubmitBetsButton from './buttons/SubmitBetsButton';
import CircleCounter from "./CircleCounter";
import EmptyBetslip from "./EmptyBetslip";

// Slices
import { clearActiveBets, submitBets } from '../slices/activeBetSlice';

// CSS
import "../css/Betslip.css"


const BetslipContainer = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: '400px',
    marginRight: 'auto'
});

const BetslipHeaderContainer = styled(Grid)({
    backgroundColor: '#131314',
    borderBottom: '1px solid #2d2f30',
    width: "100%",
    justifyContent: 'flex-start',
    padding: '30px',
    position: 'relative',
    marginBottom: '10px'
})

const BetslipTitleCounter = styled(Grid)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
});

const BetslipsContainer = styled(Box)({
    maxHeight: '650px',
    overflow: 'auto',
    marginBottom: 'auto',
});

const RemoveBetsContainer = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignContent: "center",
});

const RemoveButton = styled(Button)({
    display: 'flex',
    color: 'red',
    backgroundColor: '#131314',
    width: '100%',
    ':hover': {
        backgroundColor: 'red',
        color: 'white'
      },
});


const LoginOrSignupButton = styled(Button)({
    display: 'flex',
    color: 'green',
    backgroundColor: '#2f2d2f',
    ':hover': {
        backgroundColor: 'green',
        color: 'white'
      },
});

const SubmitAllBets = styled(Grid)({
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: "center",
    flexDirection: 'column',
    width: '100%',
    padding: '8px 0px 8px 0px',
});



const Betslip = () => {
    const dispatch = useDispatch();
    const bets = useSelector((state) => state.activeBets.bets);
    const finalizedBets = useSelector((state) => state.activeBets.finalizedBets);
    const isLoggedIn = useSelector(state => state.auth.loggedIn);
    const navigate = useNavigate();

    useEffect(() => {
    }, [bets, finalizedBets])

    return (
        <BetslipContainer className="betslip-container">

            <BetslipHeaderContainer className="betslip-title-header">
                <BetslipTitleCounter className="betslip-title-counter">
                    <CircleCounter className="betslipCounterCircle" number={bets.length} />
                    <div className="betslip-title"><b>Betslip</b></div>
                </BetslipTitleCounter>
            </BetslipHeaderContainer>

            <BetslipsContainer className="betslip">
                {
                    bets.length === 0 ? (
                        <EmptyBetslip className="betslip-empty" noBetsMessage="No bets selected" instructionsMessage="Add selections to place bet" img={null}/>
                    ) : (
                            <>
                                {
                                    bets.map((bet) => (
                                        <BetslipBet key={`${bet.game.game_id}-${bet.bet_type}`} bet={bet}/>
                                    ))
                                }

                                <RemoveBetsContainer className="removeBetsContainer">
                                    <RemoveButton startIcon={<DeleteIcon/>} onClick={() => dispatch(clearActiveBets())}>Remove all selections</RemoveButton>
                                </RemoveBetsContainer>
                            </>
                        )
                }
            </BetslipsContainer>

            <SubmitAllBets>
                {isLoggedIn ? 
                (<SubmitBetsButton sx={{ '&:hover': { color: '#ffffff', backgroundColor: '#36c729' }}}/>) 
                :
                (<LoginOrSignupButton onClick={() => navigate('/login')}>Login To Submit Bets</LoginOrSignupButton>)
                }
            </SubmitAllBets>
        </BetslipContainer>
    );
}

export default Betslip;