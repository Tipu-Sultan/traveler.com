import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthData from '../hooks/useAuthData';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthData();
  const location = useLocation();

  // If the user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;  // Render the protected component if authenticated
};

export default ProtectedRoute;
