const LoanDTO = require('../dtos/loanDTO');
const loanService = require('../services/loanService');


const listLoans = async (req, res) => {
  try {
    const loans = await loanService.getAllLoans();
    const loansDTO = loans.map((loan) => new LoanDTO(loan));
    res.status(200).json(loansDTO);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await loanService.getLoanById(id);
    if (!loan) {
      return res.status(404).json({ error: 'Emprunt non trouvé' });
    }
    res.status(200).json(new LoanDTO(loan));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addLoan = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const newLoan = await loanService.createLoan(userId, bookId);
    res.status(201).json({ message: 'Emprunt créé avec succès', loan: new LoanDTO(newLoan) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { return_date } = req.body;
    const updatedLoan = await loanService.updateLoan(id, return_date);
    res.status(200).json({ message: 'Emprunt mis à jour avec succès', loan: new LoanDTO(updatedLoan) });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await loanService.deleteLoan(id);
    res.status(200).json(message);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const { loanId } = req.params;
    const result = await loanService.returnBook(loanId);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  listLoans,
  getLoan,
  addLoan,
  updateLoan,
  deleteLoan,
  returnBook,
};
