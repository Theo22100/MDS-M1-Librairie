const reservationService = require('../services/reservationService');
const ReservationDTO = require('../dtos/reservationDTO');

const addReservation = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const reservation = await reservationService.createReservation(userId, bookId);
    res.status(201).json({ message: 'Réservation créée avec succès', reservation: new ReservationDTO(reservation) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations();
    const reservationsDTO = reservations.map((reservation) => new ReservationDTO(reservation));
    res.status(200).json(reservationsDTO);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
};
