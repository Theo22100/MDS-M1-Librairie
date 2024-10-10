import React, { useEffect, useState, useContext } from 'react';
import { getReservationsUser } from '../../services/reservationService';
import ReservationListItem from './ReservationListItem';
import { AuthContext } from '../../context/AuthContext'; 
import { jwtDecode } from 'jwt-decode'; 

const LoanList = () => {
  // État pour stocker reservations récupérés
  const [reservations, setReservations] = useState([]);
  // Récupération authentification contexte
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // Récupérer reservations de user
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (token) {
          const decodedToken = jwtDecode(token); 
          const userId = decodedToken.id; 

          // récupérer les reservations
          const data = await getReservationsUser(userId);
          setReservations(data); 
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error); 
      }
    };

    // récupération reservations si user connecté
    if (isAuthenticated) {
      fetchReservations();
    }
  }, [isAuthenticated]); // relancer l'effet lors de la modification

  return (
    <div className="row">
      {reservations.length > 0 ? (
        // Liste si réservation existe
        reservations.map((reservation) => (
          <div key={reservation.id} className="col-md-6 mb-4">
            <ReservationListItem reservation={reservation} /> 
          </div>
        ))
      ) : (
        // Aucune réservation trouvé
        <p className="text-center">Aucune Réservation trouvé.</p>
      )}
    </div>
  );
};

export default LoanList;
