const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (userData) => {
  const existingUser = await User.findOne({ where: { mail: userData.mail } });
  if (existingUser) {
    throw new Error('Cet utilisateur existe déjà.');
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return await User.create({ ...userData, password: hashedPassword });
};

const loginUser = async (mail, password) => {
  const user = await User.findOne({ where: { mail } });
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Mot de passe incorrect');
  }

  return user;
};

const getAllUsers = async () => {
  return await User.findAll({ attributes: { exclude: ['password'] } });
};

const updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  return await user.update(userData);
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  await user.destroy();
  return { message: 'Utilisateur supprimé avec succès' };
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
