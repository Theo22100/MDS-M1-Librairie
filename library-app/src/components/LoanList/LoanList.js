import React, { useEffect, useState } from 'react';
import { getAllLoans } from '../../services/loanService';
import LoanListItem from './LoanListItem';
import './css/LoanList.css';

const LoanList = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await getAllLoans();
        setLoans(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des emprunts :', error);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="loan-list">
      {loans.map((loan) => (
        <LoanListItem key={loan.id} loan={loan} />
      ))}
    </div>
  );
};

export default LoanList;
