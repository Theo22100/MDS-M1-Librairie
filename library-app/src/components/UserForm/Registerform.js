import React, { useState } from 'react';
import { registerUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import './css/UserForm.css';

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
      const response = await registerUser(userData);
      setMessage('Inscription réussie');
      console.log('Utilisateur inscrit avec succès :', response);
      navigate('/login');
    } catch (error) {
      setMessage('Erreur lors de l\'inscription');
      console.error('Erreur lors de l\'inscription :', error);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div>
        <label>Nom :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Prénom :</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </div>
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
      <button type="submit">S'inscrire</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterForm;
