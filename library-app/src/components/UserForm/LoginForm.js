import React, { useState } from 'react';
import { loginUser } from '../../services/userService';
import './UserForm.css';

const LoginForm = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ mail, password });
      console.log('Connexion réussie :', response);
      // Vous pouvez rediriger vers la page souhaitée après la connexion
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
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
    </form>
  );
};

export default LoginForm;
