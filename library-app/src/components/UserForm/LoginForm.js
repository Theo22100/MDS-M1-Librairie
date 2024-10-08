import React, { useState, useContext } from 'react';
import { loginUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './css/UserForm.css';

const LoginForm = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext); // Récupérer la fonction login du contexte
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser({ mail, password });
      login(token); // Mettre à jour l'état d'authentification en stockant le token
      navigate('/home');
    } catch (error) {
      setErrorMessage('Erreur lors de la connexion. Vérifiez vos identifiants.');
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div>
        <label>Email :</label>
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Connexion</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default LoginForm;
