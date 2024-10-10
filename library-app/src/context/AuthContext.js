import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); 
  const [isAdmin, setIsAdmin] = useState(false);

  // Vérifie si un token est présent dans le localStorage au chargement du composant
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token); 
      setUserId(decodedToken.id); 
      setIsAuthenticated(true);
      setIsAdmin(decodedToken.admin); 
    }
  }, []);

  // Fonction pour se connecter et stocker le token dans localStorage avec MAJ
  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token); 
    setUserId(decodedToken.id); 
    setIsAuthenticated(true);
    setIsAdmin(decodedToken.admin); 
  };

  // Fonction pour se déconnecter et supprimer le token
  const logout = () => {
    localStorage.removeItem('token');
    setUserId(null); 
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, isAdmin ,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
