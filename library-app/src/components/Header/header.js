import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Récupération de l'état d'authentification et de la fonction logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand">Bibliothèque</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              
              {isAuthenticated ? (
                <>
                  {/* Connecté */}
                  <li className="nav-item">
                    <Link to="/home" className="nav-link">Accueil</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/loans" className="nav-link">Emprunts</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger ms-2" onClick={handleLogout}>
                      Déconnexion
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {/* Pas Connecté */}
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Connexion</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Inscription</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
