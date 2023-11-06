import React from 'react';
import { useSelector } from 'react-redux'; 

import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(state => state.auth.loggedIn); 
  const hasToken = useSelector(state => state.auth.token); 

  const isAuthenticated = isLoggedIn && hasToken;

  console.log("PrivateRoute.js: isAuthenticated: " + isAuthenticated)

  if (!isAuthenticated){
    return <Navigate to="/login" />;
  }

  return children
};

export default PrivateRoute;
