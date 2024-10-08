import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginForm from '../components/UserForm/LoginForm';

const LoginPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home'); // Rediriger vers home si déjà connecté
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h2>Connexion</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
