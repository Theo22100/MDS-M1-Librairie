import React, { useState } from 'react';
import { addReservation } from '../../services/reservationService';

const AddReservationForm = () => {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReservation = await addReservation({ userId, bookId });
      console.log('Réservation ajoutée avec succès :', newReservation);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la réservation :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ID de l'utilisateur"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID du livre"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />
      <button type="submit">Ajouter la réservation</button>
    </form>
  );
};

export default AddReservationForm;
