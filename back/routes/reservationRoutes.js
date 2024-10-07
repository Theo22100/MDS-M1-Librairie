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
 *                 description: ID de l'utilisateur qui souhaite réserver le livre
 *                 example: 1
 *               bookId:
 *                 type: integer
 *                 description: ID du livre à réserver
 *                 example: 1
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *       400:
 *         description: Le livre est disponible ou une réservation n'est pas nécessaire
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   reservation_date:
 *                     type: string
 *                     format: date-time
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       firstname:
 *                         type: string
 *                       mail:
 *                         type: string
 *                   book:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       status:
 *                         type: string
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 reservation_date:
 *                   type: string
 *                   format: date-time
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     firstname:
 *                       type: string
 *                     mail:
 *                       type: string
 *                 book:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     status:
 *                       type: string
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
 *                 description: Nouvelle date de réservation
 *     responses:
 *       200:
 *         description: Réservation mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reservation:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     reservation_date:
 *                       type: string
 *                       format: date-time
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
