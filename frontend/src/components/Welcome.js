import { Box } from '@mui/system';

import '../css/Welcome.css'

import { useDispatch, useSelector } from 'react-redux';


const Welcome = ({ username }) => {
    const isLoggedIn = useSelector(state => state.auth.loggedIn);

    if (isLoggedIn) {
        return (
            <div className="welcome">
                <h4>Welcome, {username}</h4>
            </div>
        )
    }

    return (
        <div className="welcome">
            <h4>Welcome, Guest!</h4>
        </div>
    )
}


export  default Welcome;