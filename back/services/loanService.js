const Loan = require('../models/Loan');
const User = require('../models/User');
const Book = require('../models/Book');
const Reservation = require('../models/Reservation');

const getAllLoans = async () => {
  return await Loan.findAll({
    include: [
      { model: User, attributes: ['id', 'name', 'firstname', 'mail'] },
      { model: Book, attributes: ['id', 'title', 'author', 'status'] },
    ],
  });
};

const getLoanById = async (id) => {
  return await Loan.findByPk(id, {
    include: [
      { model: User, attributes: ['id', 'name', 'firstname', 'mail'] },
      { model: Book, attributes: ['id', 'title', 'author', 'status'] },
    ],
  });
};

const createLoan = async (userId, bookId) => {
  const book = await Book.findByPk(bookId);
  if (!book) throw new Error('Livre non trouvé');
  if (book.status === 'borrowed') throw new Error('Livre déjà emprunté');

  const user = await User.findByPk(userId);
  if (!user) throw new Error('Utilisateur non trouvé');

  const loan = await Loan.create({ userId: user.id, bookId: book.id, loan_date: new Date() });

  book.status = 'borrowed';
  await book.save();

  return await getLoanById(loan.id);
};

const updateLoan = async (id, return_date) => {
  const loan = await Loan.findByPk(id);
  if (!loan) throw new Error('Emprunt non trouvé');

  loan.return_date = return_date || loan.return_date;
  await loan.save();

  return loan;
};

const deleteLoan = async (id) => {
  const loan = await Loan.findByPk(id);
  if (!loan) throw new Error('Emprunt non trouvé');

  await loan.destroy();
  return { message: 'Emprunt supprimé avec succès' };
};

const returnBook = async (loanId) => {
  const loan = await Loan.findByPk(loanId);
  if (!loan) throw new Error('Emprunt non trouvé');

  loan.return_date = new Date();
  await loan.save();

  const book = await Book.findByPk(loan.bookId);
  if (!book) throw new Error('Livre non trouvé');

  const nextReservation = await Reservation.findOne({
    where: { bookId: book.id },
    order: [['reservation_date', 'ASC']],
  });

  if (nextReservation) {
    const newLoan = await Loan.create({
      userId: nextReservation.userId,
      bookId: book.id,
      loan_date: new Date(),
    });

    book.status = 'borrowed';
    await book.save();

    await nextReservation.destroy();

    return { message: 'Livre retourné et prêt attribué à la prochaine réservation', newLoan };
  } else {
    book.status = 'available';
    await book.save();

    return { message: 'Livre retourné avec succès et est maintenant disponible' };
  }
};

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
  returnBook,
};
