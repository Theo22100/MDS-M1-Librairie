import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); 

  // Vérifie si un token est présent dans le localStorage au chargement du composant
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token); 
      setUserId(decodedToken.id); // Recup ID user token
      setIsAuthenticated(true);
    }
  }, []);

  // Fonction pour se connecter et stocker le token dans localStorage
  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token); // Décodage du token avec jwtDecode
    setUserId(decodedToken.id); // MAJ ID user
    setIsAuthenticated(true);
  };

  // Fonction pour se déconnecter et supprimer le token
  const logout = () => {
    localStorage.removeItem('token');
    setUserId(null); // Réinitialiser id user
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
