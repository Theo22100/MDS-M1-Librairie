const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Ajouter une nouvelle réservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - bookId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               bookId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *       404:
 *         description: Utilisateur ou livre non trouvé
 *       500:
 *         description: Erreur de serveur
 */
router.post('/', reservationController.addReservation);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Liste des réservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Liste des réservations
 *       500:
 *         description: Erreur de serveur
 */
router.get('/', reservationController.listReservations);

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Obtenir les informations d'une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la réservation
 *     responses:
 *       200:
 *         description: Informations de la réservation
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur de serveur
 */
router.get('/:id', reservationController.getReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Modifier une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la réservation à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reservation_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Réservation mise à jour
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur de serveur
 */
router.put('/:id', reservationController.updateReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la réservation à supprimer
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur de serveur
 */
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
