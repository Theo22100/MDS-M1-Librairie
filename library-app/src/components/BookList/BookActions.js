import React from 'react';
import { addLoan } from '../../services/loanService'; // Importe le service d'emprunt
import { jwtDecode } from 'jwt-decode'; // Utilise jwtDecode pour décoder le token JWT

const BookActions = ({ book, refreshBooks }) => {
  // status du livre
  const buttonText = book.status === 'available' ? 'Emprunter' : 'Réserver';

  // Fonction pour gérer emprunt/réservation
  const handleButtonClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        //recup token
        const decodedToken = jwtDecode(token); 
        const userId = decodedToken.id; 

        // Si le livre dispo
        if (book.status === 'available') {
          await addLoan({ userId, bookId: book.id }); 
          alert(`Vous avez emprunté : ${book.title}`); 
        } else { 
          // TODO RESERV
          alert(`Vous avez réservé : ${book.title}`); 
        }

        // refresh
        refreshBooks(); 
      }
    } catch (error) {
      console.error("Erreur lors de l'action sur le livre :", error); 
      alert("Une erreur est survenue."); 
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
