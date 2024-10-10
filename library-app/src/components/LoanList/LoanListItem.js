const LoanListItem = ({ loan }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Emprunt</h3>
        <p className="card-text">
          <strong>Livre :</strong> {loan.book.title} - {loan.book.author}
        </p>
        <p className="card-text">
          <strong>Date de prêt :</strong> {new Date(loan.loan_date).toLocaleDateString()}
        </p>
        {loan.return_date ? (
          <p className="card-text">
            <strong>Date de retour :</strong> {new Date(loan.return_date).toLocaleDateString()}
          </p>
        ) : (
          <p className="card-text text-danger">Pas retourné</p>
        )}
      </div>
    </div>
  );
};

export default LoanListItem;
