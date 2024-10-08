const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Book = require('../models/Book');
const Loan = require('../models/Loan');

// Création réservation
const createReservation = async (userId, bookId) => {
  const book = await Book.findByPk(bookId);
  // Vérifier si le livre existe
  if (!book) throw new Error('Livre non trouvé');
  // Vérifier si le livre est disponible
  if (book.status !== 'borrowed') throw new Error("Le livre est disponible, une réservation n'est pas nécessaire.");

  // Vérifier si l'utilisateur a déjà réservé le livre
  const activeLoan = await Loan.findOne({ where: { bookId, return_date: null } });
  if (activeLoan && activeLoan.userId === userId) {
    throw new Error("Vous ne pouvez pas réserver un livre que vous avez déjà emprunté.");
  }
  // Vérifier si l'utilisateur a déjà réservé le livre
  const user = await User.findByPk(userId);
  if (!user) throw new Error('Utilisateur non trouvé');

  return await Reservation.create({ userId, bookId, reservation_date: new Date() });
};

// Récupération de toutes les réservations
const getAllReservations = async () => {
  return await Reservation.findAll({
    include: [
      { model: User, attributes: ['id', 'name', 'firstname', 'mail'] },
      { model: Book, attributes: ['id', 'title', 'author', 'status'] },
    ],
  });
};

// Récupération réservation par id
const getReservationById = async (id) => {
  return await Reservation.findByPk(id, {
    include: [
      { model: User, attributes: ['id', 'name', 'firstname', 'mail'] },
      { model: Book, attributes: ['id', 'title', 'author', 'status'] },
    ],
  });
};

// Mise à jour réservation
const updateReservation = async (id, reservation_date) => {
  const reservation = await Reservation.findByPk(id);
  if (!reservation) throw new Error('Réservation non trouvée');

  reservation.reservation_date = reservation_date || reservation.reservation_date;
  await reservation.save();

  return reservation;
};

// Suppression réservation
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
