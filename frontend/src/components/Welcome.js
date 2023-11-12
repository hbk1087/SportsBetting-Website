import { Box } from '@mui/system';

import '../css/Welcome.css'

import { useSelector } from 'react-redux';


const Welcome = () => {
    const isLoggedIn = useSelector(state => state.auth.loggedIn);
    const username = useSelector(state => state.user.username);
    const usernameLocal = localStorage.getItem("username");

    if (isLoggedIn) {
        return (
            <div className="welcome">
                <h4>Welcome {username}</h4>
            </div>
        )
    }

    return (
        <div className="welcome">
            <h4>Welcome Guest!</h4>
        </div>
    )
}


export  default Welcome;