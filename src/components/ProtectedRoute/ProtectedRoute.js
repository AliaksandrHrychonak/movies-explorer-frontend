import React from 'react';
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  const location = useLocation()

  if(!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />
  }

  return children
}
export default ProtectedRoute;