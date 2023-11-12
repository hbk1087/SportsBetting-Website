import React from 'react';
import { useSelector } from 'react-redux'; 

import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ auth: { isLoggedIn }, children }) => {

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
