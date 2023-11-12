import { Box } from '@mui/system';

import '../css/Welcome.css'

import { useSelector } from 'react-redux';


const Welcome = () => {
    const username = useSelector(state => state.user.username);
    const balance = useSelector((state) => state.user.balance);


    return (
        <div className="welcome">
            <h4>Welcome: &nbsp; {username}</h4>
            <h5>Balance: ${balance}</h5>
        </div>
    )
}


export  default Welcome;