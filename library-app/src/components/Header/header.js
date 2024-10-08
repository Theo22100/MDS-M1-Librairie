import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './css/Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Récupération de l'état d'authentification et de la fonction logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <nav className="nav">
        {isAuthenticated ? (
          <>
            {/* Liens affichés si l'utilisateur est connecté */}
            <Link to="/home" className="nav-link">Accueil</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Déconnexion
            </button>
          </>
        ) : (
          <>
            {/* Liens affichés si l'utilisateur n'est pas connecté */}
            <Link to="/login" className="nav-link">Connexion</Link>
            <Link to="/register" className="nav-link">Inscription</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
