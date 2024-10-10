const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Book = require('../models/Book');
const Loan = require('../models/Loan');


const createReservation = async (userId, bookId) => {
  const book = await Book.findByPk(bookId);

  // Vérifier si livre existe
  if (!book) throw new Error('Livre non trouvé');

  // Vérifier si livre est disponible
  if (book.status !== 'borrowed') {
    throw new Error("Le livre est disponible, une réservation n'est pas nécessaire.");
  }

  // Vérifier si user a déjà emprunté le livre et ne l'a pas encore retourné
  const activeLoan = await Loan.findOne({ where: { bookId, userId, return_date: null } });
  if (activeLoan) {
    console.log('L\'utilisateur a déjà emprunté le livre et ne l\'a pas rendu.');
    throw new Error("Vous ne pouvez pas réserver un livre que vous avez déjà emprunté et que vous n'avez pas encore retourné.");
  }

  // Vérifier si user a déjà réservé ce livre
  const existingReservation = await Reservation.findOne({ where: { bookId, userId } });
  if (existingReservation) {
    throw new Error("Vous avez déjà réservé ce livre.");
  }


  // Vérifier si user existe
  const user = await User.findByPk(userId);
  if (!user) throw new Error('Utilisateur non trouvé');

  // Créer la réservation
  console.log('Création de la réservation pour l\'utilisateur:', userId, 'et le livre:', bookId);
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

// Récupérer toutes les réservations d'un utilisateur spécifique
const getUserReservations = async (userId) => {
  // Verif si user existe
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  // Récupérer les réservations de user avec info livres
  const reservations = await Reservation.findAll({
    where: { userId },
    include: [
      {
        model: Book,
        attributes: ['id', 'title', 'author', 'status'],
      },
    ],
  });

  return reservations;
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getUserReservations,
};
