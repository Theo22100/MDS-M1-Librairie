import React, { useState } from 'react';
import { addLoan } from '../../../services/loanService';

const AddLoanForm = () => {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newLoan = await addLoan({ userId, bookId });
      console.log('Emprunt ajouté avec succès :', newLoan);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'emprunt :', error);
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
      <button type="submit">Ajouter l'emprunt</button>
    </form>
  );
};

export default AddLoanForm;
