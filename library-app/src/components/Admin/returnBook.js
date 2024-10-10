import React from 'react';
import { returnLoan } from '../../services/loanService';

const ReturnBook = ({ loanId, onReturnSuccess }) => {
  const handleReturn = async () => {
    try {
      await returnLoan(loanId);
      onReturnSuccess(); // Notifie réussite
    } catch (error) {
      console.error("Erreur lors du retour du livre :", error);
    }
  };

  return (
    <button onClick={handleReturn} className="btn btn-success">
      Retourner le livre
    </button>
  );
};

export default ReturnBook;
