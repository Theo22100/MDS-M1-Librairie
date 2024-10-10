const reservationService = require('../services/reservationService');
const ReservationDTO = require('../dtos/reservationDTO');

// Création réservation
const addReservation = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const reservation = await reservationService.createReservation(userId, bookId);
    res.status(201).json({ message: 'Réservation créée avec succès', reservation: new ReservationDTO(reservation) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupération de toutes les réservations
const listReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations();
    const reservationsDTO = reservations.map((reservation) => new ReservationDTO(reservation));
    res.status(200).json(reservationsDTO);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupération réservation par id
const getReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await reservationService.getReservationById(id);
    if (!reservation) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }
    res.status(200).json(new ReservationDTO(reservation));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer toutes les réservations d'un utilisateur spécifique
const getUserReservations = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await reservationService.getUserReservations(userId);
    const reservationDTOs = reservations.map((reservation) => new ReservationDTO(reservation));

    res.status(200).json(reservationDTOs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Mise à jour réservation
const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { reservation_date } = req.body;
    const updatedReservation = await reservationService.updateReservation(id, reservation_date);
    res.status(200).json({ message: 'Réservation mise à jour avec succès', reservation: new ReservationDTO(updatedReservation) });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
// Suppression réservation
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await reservationService.deleteReservation(id);
    res.status(200).json(message);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  addReservation,
  listReservations,
  getReservation,
  updateReservation,
  deleteReservation,
  getUserReservations,
};
