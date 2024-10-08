import React, { useEffect, useState, useContext } from 'react';
import { getLoansUser } from '../../services/loanService';
import LoanListItem from './LoanListItem';
import { AuthContext } from '../../context/AuthContext'; 
import { jwtDecode } from 'jwt-decode'; 

const LoanList = () => {
  // État pour stocker emprunts récupérés
  const [loans, setLoans] = useState([]);
  // Récupération authentification contexte
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // Récupérer emprunts de user
    const fetchLoans = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (token) {
          const decodedToken = jwtDecode(token); 
          const userId = decodedToken.id; 

          // récupérer les emprunts
          const data = await getLoansUser(userId);
          setLoans(data); 
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des emprunts :', error); 
      }
    };

    // récupération emprunts si user connecté
    if (isAuthenticated) {
      fetchLoans();
    }
  }, [isAuthenticated]); // relancer l'effet lors de la modification

  return (
    <div className="row">
      {loans.length > 0 ? (
        // Liste si emprunt existe
        loans.map((loan) => (
          <div key={loan.id} className="col-md-6 mb-4">
            <LoanListItem loan={loan} /> 
          </div>
        ))
      ) : (
        // Aucun emprunt trouvé
        <p className="text-center">Aucun emprunt trouvé.</p>
      )}
    </div>
  );
};

export default LoanList;
