import React from 'react';
import './css/LoanList.css';

const LoanListItem = ({ loan }) => {
  return (
    <div className="loan-list-item">
      <h3>Emprunt #{loan.id}</h3>
      <p>Utilisateur : {loan.user.name} {loan.user.firstname}</p>
      <p>Livre : {loan.book.title} - {loan.book.author}</p>
      <p>Date de prêt : {new Date(loan.loan_date).toLocaleDateString()}</p>
      {loan.return_date ? (
        <p>Date de retour : {new Date(loan.return_date).toLocaleDateString()}</p>
      ) : (
        <p>Non encore retourné</p>
      )}
    </div>
  );
};

export default LoanListItem;
