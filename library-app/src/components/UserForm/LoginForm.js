import React, { useState, useContext } from 'react';
import { loginUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser({ mail, password });
      login(token); 
      navigate('/home');
    } catch (error) {
      setErrorMessage('Erreur lors de la connexion. Vérifiez vos identifiants.');
    }
  };

  return (
    <form className="container mt-4" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email :</label>
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">Connexion</button>
      {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
    </form>
  );
};

export default LoginForm;
