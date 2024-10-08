import React from 'react';
import LoanList from '../components/LoanList/LoanList';

const LoansPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Mes Emprunts</h1>
      <LoanList />
    </div>
  );
};

export default LoansPage;
