import { React, useEffect } from 'react';

// MUI
import { Button, Grid, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Components
import BetslipBet from './BetslipBet';
import CircleCounter from "./CircleCounter";
import EmptyBetslip from "./EmptyBetslip";

// Slices
import { clearActiveBets, submitBets } from '../slices/activeBetSlice';

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
});

const RemoveBetsContainer = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignContent: "center"
});

const LoginPromptContainer = styled(Grid)({

});

const SubmitBetsButton = styled(Button)({
    display: 'flex',
});

const SubmitAllBets = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignContent: "center"
});

const Betslip = () => {
    const dispatch = useDispatch();
    const bets = useSelector((state) => state.activeBets.bets);

    useEffect(() => {
    }, [bets])

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
                                        <BetslipBet key={bet.id} bet={bet} />
                                    ))
                                }

                                <RemoveBetsContainer className="removeBetsContainer">
                                    <Button className="clearButton" startIcon={<DeleteIcon/>} onClick={() => dispatch(clearActiveBets())}>Remove all selections</Button>
                                </RemoveBetsContainer>
                            </>
                        )
                }
            </BetslipsContainer>

            <SubmitAllBets>
                <SubmitBetsButton className="submitAllBetsButton" onClick={() => dispatch(submitBets())}>Submit all bets!</SubmitBetsButton>
            </SubmitAllBets>
        </BetslipContainer>
    );
}

export default Betslip;