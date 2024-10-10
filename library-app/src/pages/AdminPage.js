import React, { useState } from 'react';
import AddBookForm from '../components/Admin/addBook';
import ReturnBook from '../components/Admin/returnBook';

const AdminPage = () => {
  const [message, setMessage] = useState('');
  const [loanId, setLoanId] = useState(''); 

  const handleSuccess = () => {
    setMessage('Le livre a été ajouté avec succès');
  };

  const handleReturnSuccess = () => {
    setMessage('Le livre a été retourné avec succès');
  };

  const handleError = (error) => {
    console.error("Erreur lors de l'ajout du livre :", error);
    setMessage("Une erreur s'est produite lors de l'ajout du livre.");
  };

  return (
    <div className="container">
      <h1>Gestion des Livres</h1>
      {message && <p>{message}</p>}

      {/* Formulaire d'ajout de livre */}
      <AddBookForm onSuccess={handleSuccess} onError={handleError} />

      {/* Gestion des retours de livres */}
      <div className="mt-4">
        <h2>Retourner un Livre</h2>
        <input
          type="text"
          placeholder="ID de l'emprunt"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
          className="form-control mb-2"
        />
        <ReturnBook loanId={loanId} onReturnSuccess={handleReturnSuccess} />
      </div>
    </div>
  );
};

export default AdminPage;
