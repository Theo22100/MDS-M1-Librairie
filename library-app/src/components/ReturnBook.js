import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReturnBook = () => {
  const { id } = useParams(); // Récupère l'ID du livre à partir de l'URL
  const [message, setMessage] = useState('');

  const handleReturnBook = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/return/${id}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || 'An error occurred'}`);
    }
  };

  return (
    <div>
      <h1>Return Book</h1>
      <button onClick={handleReturnBook}>Retourner le Livre</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReturnBook;
