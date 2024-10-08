import React, { useState } from 'react';
import { returnLoan } from '../../services/loanService';

const ReturnLoanButton = ({ loanId }) => {
  const [message, setMessage] = useState('');

  const handleReturn = async () => {
    try {
      const response = await returnLoan(loanId);
      setMessage(response.message);
    } catch (error) {
      setMessage('Erreur lors du retour du livre.');
    }
  };

  return (
    <div>
      <button onClick={handleReturn}>Retourner le livre</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReturnLoanButton;
