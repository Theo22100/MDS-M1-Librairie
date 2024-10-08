import React, { createContext, useState, useEffect } from 'react';

// Création du contexte d'authentification
export const AuthContext = createContext();

// Composant fournisseur d'authentification
const AuthProvider = ({ children }) => {
  // État qui détermine si l'utilisateur est authentifié
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifie si un token est présent dans le localStorage au chargement du composant
  useEffect(() => {
    const token = localStorage.getItem('token'); // Recup token
    if (token) {
      setIsAuthenticated(true); 
    } else {
      console.log('Pas de token trouvé, isAuthenticated reste false'); 
    }
  }, []); // L'effet ne s'exécute qu'une seule fois, au montage du composant

  // Fonction pour se connecter et stocker le token dans localStorage
  const login = (token) => {
    localStorage.setItem('token', token); 
    setIsAuthenticated(true); 
  };

  // Fonction pour se déconnecter et supprimer le token de localStorage
  const logout = () => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false); 
  };

  // Fournit les fonctions et l'état d'authentification à tous les composants enfants
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
