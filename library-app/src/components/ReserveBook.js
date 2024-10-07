import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReserveBook = () => {
  const { id } = useParams(); // Récupère l'ID du livre à partir de l'URL
  const [message, setMessage] = useState('');

  const handleReserveBook = async () => {
    try {
      const userId = 'user-id-placeholder'; // Remplacez par l'ID de l'utilisateur actuel
      const response = await axios.post(`http://localhost:5000/api/reserve/${id}`, { userId });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || 'An error occurred'}`);
    }
  };

  return (
    <div>
      <h1>Reserve Book</h1>
      <button onClick={handleReserveBook}>Réserver le Livre</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReserveBook;
