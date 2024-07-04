import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, user, children }) {
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return React.cloneElement(children, { user });
}

export default ProtectedRoute;