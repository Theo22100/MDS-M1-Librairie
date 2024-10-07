const Reservation = require("../models/Reservation");
const User = require("../models/User");
const Book = require("../models/Book");
const Loan = require("../models/Loan");

// Ajouter une réservation
const addReservation = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Vérif si livre existe
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: "Livre non trouvé" });
    }

    // Vérif si livre dispo
    if (book.status !== "borrowed") {
      return res
        .status(400)
        .json({
          error:
            "Le livre est disponible, une réservation n'est pas nécessaire.",
        });
    }

    // Vérif emprunt livre par owner requete
    const activeLoan = await Loan.findOne({
      where: { bookId, return_date: null },
    });
    if (activeLoan && activeLoan.userId === userId) {
      return res
        .status(400)
        .json({
          error:
            "Vous ne pouvez pas réserver un livre que vous avez déjà emprunté.",
        });
    }

    // Vérif si user exist
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Add réservation
    const reservation = await Reservation.create({
      userId,
      bookId,
      reservation_date: new Date(),
    });

    res
      .status(201)
      .json({ message: "Réservation créée avec succès", reservation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer liste réservations
const listReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        { model: User, attributes: ["id", "name", "firstname", "mail"] },
        { model: Book, attributes: ["id", "title", "author", "status"] },
      ],
    });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir les informations d'une réservation spécifique
const getReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id, {
      include: [
        { model: User, attributes: ["id", "name", "firstname", "mail"] },
        { model: Book, attributes: ["id", "title", "author", "status"] },
      ],
    });

    if (!reservation) {
      return res.status(404).json({ error: "Réservation non trouvée" });
    }

    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modifier une réservation
const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { reservation_date } = req.body;

    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ error: "Réservation non trouvée" });
    }

    reservation.reservation_date =
      reservation_date || reservation.reservation_date;
    await reservation.save();

    res
      .status(200)
      .json({ message: "Réservation mise à jour avec succès", reservation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer une réservation
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ error: "Réservation non trouvée" });
    }

    await reservation.destroy();
    res.status(200).json({ message: "Réservation supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addReservation,
  listReservations,
  getReservation,
  updateReservation,
  deleteReservation,
};
