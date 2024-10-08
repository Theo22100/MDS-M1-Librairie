import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import RegisterForm from '../components/UserForm/Registerform';

const RegisterPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home'); // Rediriger vers home si déjà connecté
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h2>Inscription</h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
