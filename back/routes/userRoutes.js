const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Inscrire un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - firstname
 *               - mail
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *                 example: "Test"
 *               firstname:
 *                 type: string
 *                 description: Prénom de l'utilisateur
 *                 example: "Théo"
 *               mail:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *                 example: "p4$$w0rd"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: L'utilisateur existe déjà
 *       500:
 *         description: Erreur de serveur
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mail
 *               - password
 *             properties:
 *               mail:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *                 example: "p4$$w0rd"
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Mot de passe incorrect
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur de serveur
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Liste des utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   mail:
 *                     type: string
 *       500:
 *         description: Erreur de serveur
 */
router.get('/', userController.listUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               firstname:
 *                 type: string
 *                 description: Prénom de l'utilisateur
 *               mail:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur de serveur
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur de serveur
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
