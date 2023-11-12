import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';


import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// Slices
import { submitBets } from '../../slices/activeBetSlice';

import '../../css/SubmitBetsButton.css';

const SubmitBetsButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector(state => state.auth.loggedIn);

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (hasError) {
            setTimeout(() => {
                setHasError(false);
            }, 250);
        }
    }, [hasError, isLoggedIn]);

    const handleClick = () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        dispatch(submitBets())
        .then(response => {
            setHasError(false);
        }).catch(error => {
            setHasError(true);
        })
    };

    return (
        <Button
        className={isLoggedIn? (hasError ? 'shake-animation' : '') : 'disabled'}
        onClick={handleClick}
        >
        { isLoggedIn ? 'Submit Bets' : 'Login to Submit Bets' }
        </Button>
    );
};

export default SubmitBetsButton;
