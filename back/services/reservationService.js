const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Book = require('../models/Book');
const Loan = require('../models/Loan');

const createReservation = async (userId, bookId) => {
  const book = await Book.findByPk(bookId);
  if (!book) throw new Error('Livre non trouvé');
  if (book.status !== 'borrowed') throw new Error("Le livre est disponible, une réservation n'est pas nécessaire.");

  const activeLoan = await Loan.findOne({ where: { bookId, return_date: null } });
  if (activeLoan && activeLoan.userId === userId) {
    throw new Error("Vous ne pouvez pas réserver un livre que vous avez déjà emprunté.");
  }

  const user = await User.findByPk(userId);
  if (!user) throw new Error('Utilisateur non trouvé');

  return await Reservation.create({ userId, bookId, reservation_date: new Date() });
};

const getAllReservations = async () => {
  return await Reservation.findAll({
    include: [
      { model: User, attributes: ['id', 'name', 'firstname', 'mail'] },
      { model: Book, attributes: ['id', 'title', 'author', 'status'] },
    ],
  });
};

const getReservationById = async (id) => {
  return await Reservation.findByPk(id, {
    include: [
      { model: User, attributes: ['id', 'name', 'firstname', 'mail'] },
      { model: Book, attributes: ['id', 'title', 'author', 'status'] },
    ],
  });
};

const updateReservation = async (id, reservation_date) => {
  const reservation = await Reservation.findByPk(id);
  if (!reservation) throw new Error('Réservation non trouvée');

  reservation.reservation_date = reservation_date || reservation.reservation_date;
  await reservation.save();

  return reservation;
};

const deleteReservation = async (id) => {
  const reservation = await Reservation.findByPk(id);
  if (!reservation) throw new Error('Réservation non trouvée');

  await reservation.destroy();
  return { message: 'Réservation supprimée avec succès' };
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
