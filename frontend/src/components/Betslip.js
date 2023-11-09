import { React, useEffect } from 'react';

// MUI
import { Button, Grid } from '@mui/material';
import { styled } from '@mui/system';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Components
import BetslipBet from './BetslipBet';
import CircleCounter from "./CircleCounter";
import EmptyBetslip from "./EmptyBetslip";

// Slices
import { clearActiveBets } from '../slices/activeBetSlice';

import "../css/Betslip.css"


const BetslipContainer = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'

})
const BetslipHeaderContainer = styled(Grid)({

})
const BetslipsContainer = styled(Grid)({

})

const RemoveBetsContainer = styled(Grid)({

})
const LoginPromptContainer = styled(Grid)({

})

const Betslip = () => {
    const dispatch = useDispatch();
    var bets = useSelector((state) => state.activeBets.bets);
    var selectedGames = useSelector((state) => state.activeBets.selectedGames);

    useEffect(() => {
    }, [selectedGames, bets])

    return (
        <BetslipContainer className="betslip-container">
            <BetslipHeaderContainer className="betslip-title-header">
                <div className="betslip-title">Betslip</div>
                <CircleCounter number={bets.length} />
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

                                <RemoveBetsContainer>
                                    <Button className="betslip-clear" onClick={() => dispatch(clearActiveBets())}>Clear</Button>
                                </RemoveBetsContainer>
                            </>
                        )
                }
            </BetslipsContainer>
        </BetslipContainer>
    );
    
}

export default Betslip;