const userService = require('../services/userService');
const UserDTO = require('../dtos/UserDTO');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, firstname, mail, password } = req.body;
    const newUser = await userService.registerUser({ name, firstname, mail, password });
    res.status(201).json({ message: 'Utilisateur créé avec succès', user: new UserDTO(newUser) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await userService.loginUser(mail, password);

    // Générer un jeton JWT
    const token = jwt.sign({ id: user.id, mail: user.mail }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (err) {
    if (err.message === 'Utilisateur non trouvé' || err.message === 'Mot de passe incorrect') {
      res.status(401).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const usersDTO = users.map((user) => new UserDTO(user));
    res.status(200).json(usersDTO);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, firstname, mail } = req.body;
    const updatedUser = await userService.updateUser(id, { name, firstname, mail });
    res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user: new UserDTO(updatedUser) });
  } catch (err) {
    if (err.message === 'Utilisateur non trouvé') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await userService.deleteUser(id);
    res.status(200).json(message);
  } catch (err) {
    if (err.message === 'Utilisateur non trouvé') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = {
  register,
  login,
  listUsers,
  updateUser,
  deleteUser,
};
