const Loan = require('../models/Loan');
const User = require('../models/User');
const Book = require('../models/Book');
const Reservation = require('../models/Reservation');

// Récupération de tous les emprunts
const getAllLoans = async () => {
  return await Loan.findAll({
    include: [
      { model: User, attributes: ['id', 'name', 'firstname', 'mail'] },
      { model: Book, attributes: ['id', 'title', 'author', 'status'] },
    ],
  });
};


// Récupération emprunt par id
const getLoanById = async (id) => {
  return await Loan.findByPk(id, {
    include: [
      { model: User, attributes: ['id', 'name', 'firstname', 'mail'] },
      { model: Book, attributes: ['id', 'title', 'author', 'status'] },
    ],
  });
};

//  Création emprunt
const createLoan = async (userId, bookId) => {
  const book = await Book.findByPk(bookId);
  // Vérifier si le livre existe
  if (!book) throw new Error('Livre non trouvé');
  // Vérifier si le livre est disponible
  if (book.status === 'borrowed') throw new Error('Livre déjà emprunté');

  const user = await User.findByPk(userId);
  if (!user) throw new Error('Utilisateur non trouvé');

  const loan = await Loan.create({ userId: user.id, bookId: book.id, loan_date: new Date() });

  book.status = 'borrowed';
  await book.save();

  return await getLoanById(loan.id);
};
//  Mise à jour emprunt
const updateLoan = async (id, return_date) => {
  const loan = await Loan.findByPk(id);
  if (!loan) throw new Error('Emprunt non trouvé');

  loan.return_date = return_date || loan.return_date;
  await loan.save();

  return loan;
};
// Suppression emprunt
const deleteLoan = async (id) => {
  const loan = await Loan.findByPk(id);
  if (!loan) throw new Error('Emprunt non trouvé');

  await loan.destroy();
  return { message: 'Emprunt supprimé avec succès' };
};

// Retourner un livre
const returnBook = async (loanId) => {
  // Vérifier si l'emprunt existe
  const loan = await Loan.findByPk(loanId);
  if (!loan) throw new Error('Emprunt non trouvé');
  // Vérifier si le livre existe
  const book = await Book.findByPk(loan.bookId);
  if (!book) throw new Error('Livre non trouvé');
  // MAJ date retour
  loan.return_date = new Date();
  await loan.save();
  // Vérifier si le livre a des réservations
  const nextReservation = await Reservation.findOne({
    where: { bookId: book.id },
    order: [['reservation_date', 'ASC']],
  });
  // Si oui, attribuer le prêt à la prochaine réservation
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

const getUserLoans = async (userId) => {
  // Vérifier si l'utilisateur existe
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  // Récupérer les emprunts de l'utilisateur avec les informations livres
  const loans = await Loan.findAll({
    where: { userId },
    include: [
      {
        model: Book,
        attributes: ['id', 'title', 'author', 'status'],
      },
    ],
  });

  return loans;
};

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
  returnBook,
  getUserLoans,
};
