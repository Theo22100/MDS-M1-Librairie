import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element: Element }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Si user est authentifié, on rend le composant, sinon on redirige vers /login
  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
