import React from 'react';
import ReservationList from '../components/ReservationList/ReservationList';

const ReservationsPage = () => {
  return (
    <div className="container">
      <h1 className="my-4">Mes Réservations</h1>
      <ReservationList />
    </div>
  );
};

export default ReservationsPage;
