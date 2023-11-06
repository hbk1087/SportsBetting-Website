import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';
import { setToken, setLoggedIn } from '../slices/authSlice'

import LoadingIndicator from '../util/LoadingIndicator';

function NotFoundPage() {
    const navigate = useNavigate();

    const isLoggedIn = useSelector(state => state.auth.loggedIn);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isLoggedIn) {
                navigate("/login");
            }
            navigate('/');
        }, 2000);

    // Cleanup to prevent redirection if the component is unmounted before 2 seconds
    return () => clearTimeout(timer);
    }, [navigate]);

    return (
    <div>
        <h2>
            <div>404: Page Not Found.</div> 
            <div>Redirecting...</div>

            <LoadingIndicator />
        </h2>
    </div>
    )
    }


export default NotFoundPage;