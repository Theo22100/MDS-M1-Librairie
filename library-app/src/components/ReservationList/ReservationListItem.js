import React from "react";

const ReservationListItem = ({ reservation }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Réservation</h3>
        <p className="card-text">
        <strong>Utilisateur :</strong> {reservation.user.name} {reservation.user.firstname}
        </p>
        <p className="card-text">
        <strong>Livre :</strong> {reservation.book.title} - {reservation.book.author}
        </p>
        <p className="card-text">
        <strong>Date de réservation :</strong>{" "}
          {new Date(reservation.reservation_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ReservationListItem;
