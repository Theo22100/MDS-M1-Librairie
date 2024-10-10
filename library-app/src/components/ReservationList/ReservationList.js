import React, { useEffect, useState } from 'react';
import { getAllReservations } from '../../services/reservationService';
import ReservationListItem from './ReservationListItem';
// NON FINI
const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getAllReservations();
        setReservations(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        {reservations.map((reservation) => (
          <ReservationListItem key={reservation.id} reservation={reservation} />
       ))}
      </div>
    </div>
  );
};

export default ReservationList;
