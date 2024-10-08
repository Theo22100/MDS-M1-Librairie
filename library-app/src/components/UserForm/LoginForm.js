import React, { useState } from 'react';
import { loginUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import './css/UserForm.css';

const LoginForm = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ mail, password });
      navigate('/books');
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
