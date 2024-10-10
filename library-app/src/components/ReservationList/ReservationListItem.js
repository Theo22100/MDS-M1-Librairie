const ReservationListItem = ({ reservation }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Réservation</h3>
        <p className="card-text">
          <strong>Livre :</strong> {reservation.book.title} - {reservation.book.author}
        </p>
        <p className="card-text">
          <strong>Date de Réservation :</strong> {new Date(reservation.reservation_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ReservationListItem;
