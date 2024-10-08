import React, { useState } from 'react';
import { registerUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, firstname, mail, password };
      await registerUser(userData);
      setMessage('Inscription réussie');
      navigate('/login');
    } catch (error) {
      setMessage("Erreur lors de l'inscription");
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <form className="container mt-4" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nom :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Prénom :</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="form-control"
          required
        />
      </div>
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
      <button type="submit" className="btn btn-primary mt-3">S'inscrire</button>
      {message && <p className="text-success mt-2">{message}</p>}
    </form>
  );
};

export default RegisterForm;
