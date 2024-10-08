import React from 'react';
import './css/BookList.css';

const BookListItem = ({ book, onLoan, onReserve }) => {
  const statusText = book.status === 'available' ? 'Disponible' : 'Emprunté';

  // Déterminer l'action et le texte du bouton en fonction du statut
  const buttonText = book.status === 'available' ? 'Emprunter' : 'Réserver';

  const handleButtonClick = () => {
    if (book.status === 'available') {
      onLoan(book); // Appelle la fonction d'emprunt
    } else {
      onReserve(book); // Appelle la fonction de réservation
    }
  };

  return (
    <div className="book-list-item">
      <h3>{book.title}</h3>
      <p>Auteur : {book.author}</p> 
      <p className={statusText}>Statut : {statusText}</p>
      <button onClick={handleButtonClick} className="action-button">
        {buttonText}
      </button>
    </div>
  );
};

export default BookListItem;
