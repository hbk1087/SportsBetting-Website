import { React, useEffect } from 'react';

// MUI
import { Button, Box, Typography } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Components
import BetslipBet from './BetslipBet';

// Slices
import { clearActiveBets } from '../slices/activeBetSlice';

import "../css/Betslip.css"

function CircleCounter({ number }) {

    useEffect(() => {
    }, [number])


    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            alignContent="center"
            justifyContent="spacing-between"
            border="2px solid white"
            borderRadius="50%" // makes it circular
            width={50} // width of the circle
            height={50} // height of the circle
            bgcolor="primary.main" // background color
            color="white" // text color

        >
            <Typography 
                variant="body1" 
                style={{ display: "flex", alignContent: "center", justifyContent: "center", color: "blue", textAlign: "center"}}>{number}
            </Typography>
        </Box>
    );
}

const Betslip = () => {
    const dispatch = useDispatch();
    var bets = useSelector((state) => state.activeBets.bets);
    var selectedGames = useSelector((state) => state.activeBets.selectedGames);

    useEffect(() => {
        console.log("Rerendering Betslip.js")
    }, [selectedGames, bets])

    return (
        <div className="betslip-container">
            <div className="betslip-title-header">
                <div className="betslip-title">Betslip</div>
                <CircleCounter number={bets.length} />
            </div>
            <div className="betslip">
                {
                    bets.length === 0 ? (
                        <div className="betslip-empty">No bets selected</div>
                    ) : (
                            <>
                                {
                                    bets.map((bet) => (
                                        <BetslipBet key={bet.id} bet={bet} />
                                    ))
                                }
                            </>
                        )
                }
            </div>
            <Button className="betslip-clear" onClick={() => dispatch(clearActiveBets())}>Clear</Button>
        </div>
    );
    
}

export default Betslip;