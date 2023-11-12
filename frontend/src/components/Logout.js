// Redux
import { useDispatch } from 'react-redux';
import { setToken, removeToken, initializeToken, setLoggedIn } from '../slices/authSlice'

// React Router
import { useNavigate } from "react-router-dom";

// Axios
import axios from "axios";

// Components
import LogoutButton from "../components/buttons/LogoutButton"
import "../css/LogoutButton.css"

function Logout() {

    const dispatch = useDispatch();

    dispatch(setLoggedIn(false));
    dispatch(removeToken());
    dispatch(setUsername('guest'))

      return (
        <LogoutButton onLogout={logMeOut} />
      );
}

export default Logout;