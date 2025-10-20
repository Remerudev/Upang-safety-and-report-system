import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, isAuthenticated }) {
  const auth = typeof isAuthenticated === 'boolean' ? isAuthenticated : (localStorage.getItem('token') ? true : false);
  return auth ? children : <Navigate to="/signin" replace />;
}
