import React from 'react';
import { addLoan } from '../../services/loanService'; 
import { addReservation } from '../../services/reservationService'; 
import { jwtDecode } from 'jwt-decode'; 

const BookActions = ({ book, refreshBooks }) => {
  // status du livre
  const buttonText = book.status === 'available' ? 'Emprunter' : 'Réserver';

  // Fonction pour gérer emprunt/réservation
  const handleButtonClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token); 
        const userId = decodedToken.id;
  
        if (book.status === 'available') {
          await addLoan({ userId, bookId: book.id });
          alert(`Vous avez emprunté : ${book.title}`);
        } else {
          await addReservation({ userId, bookId: book.id });
          alert(`Vous avez réservé : ${book.title}`);
        }
  
        // Appeler la fonction pour rafraîchir liste des livres
        refreshBooks();
      }
    } catch (error) {
      console.error("Erreur lors de l'action sur le livre :", error.response?.data?.error || error.message);
      alert(error.response?.data?.error || "Une erreur est survenue.");
    }
  };

  return (
    // Bouton déclencheur emprunt réservation
    <button onClick={handleButtonClick} className="btn btn-primary">
      {buttonText} 
    </button>
  );
};

export default BookActions;
