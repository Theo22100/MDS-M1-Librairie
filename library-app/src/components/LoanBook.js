import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LoanBook = () => {
  const { id } = useParams(); // Récupère l'ID du livre à partir de l'URL
  const [message, setMessage] = useState('');

  const handleLoanBook = async () => {
    try {
      const userId = 'user-id-placeholder'; // Remplacez par l'ID de l'utilisateur actuel
      const response = await axios.post(`http://localhost:5000/api/loan/${id}`, { userId });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || 'An error occurred'}`);
    }
  };

  return (
    <div>
      <h1>Loan Book</h1>
      <button onClick={handleLoanBook}>Emprunter le Livre</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoanBook;
