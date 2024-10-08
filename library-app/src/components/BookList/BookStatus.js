import React from 'react';

const BookStatus = ({ status }) => {
  const statusText = status === 'available' ? 'Disponible' : 'Emprunté';
  return (
    <p className={status === 'available' ? 'text-success font-weight-bold' : 'text-danger font-weight-bold'}>
      Statut : {statusText}
    </p>
  );
};

export default BookStatus;
