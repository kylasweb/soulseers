import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'user' | 'reader' | 'admin'>;
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps): ReactElement => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login while saving the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace /> as ReactElement;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // User's role is not authorized
    return <Navigate to="/unauthorized" replace /> as ReactElement;
  }

  return React.createElement(React.Fragment, null, children);
};

export default ProtectedRoute; 