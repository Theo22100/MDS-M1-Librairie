import React from 'react';
import LoanList from '../components/LoanList/LoanList';

const LoansPage = () => {
  return (
    <div className="container">
      <h1 className="my-4">Mes Emprunts</h1>
      <LoanList />
    </div>
  );
};

export default LoansPage;
