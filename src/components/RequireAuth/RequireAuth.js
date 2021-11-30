import React from 'react';
import { useLocation, Navigate } from "react-router-dom";

export const RequireAuth = ({ isLoggedIn, children }) => {
  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
}
