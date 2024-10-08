import React from 'react';
import './css/Reservation.css';

const ReservationListItem = ({ reservation }) => {
  return (
    <div className="reservation-list-item">
      <h3>Réservation #{reservation.id}</h3>
      <p>Utilisateur : {reservation.user.name} {reservation.user.firstname}</p>
      <p>Livre : {reservation.book.title} - {reservation.book.author}</p>
      <p>Date de réservation : {new Date(reservation.reservation_date).toLocaleDateString()}</p>
    </div>
  );
};

export default ReservationListItem;
