import React, { useEffect, useState } from 'react';
import { getAllReservations } from '../../services/reservationService';
import ReservationListItem from './ReservationListItem';
import './css/Reservation.css';

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
    <div className="reservation-list">
      {reservations.map((reservation) => (
        <ReservationListItem key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
};

export default ReservationList;
