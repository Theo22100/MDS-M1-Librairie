const { Sequelize } = require('sequelize');

// Config env
let sequelize;

if (process.env.NODE_ENV === 'test') {
  // Utiliser SQLite en mémoire pour les tests
  sequelize = new Sequelize('sqlite::memory:', {
    logging: false, 
  });
} else {
  // Utiliser MySQL pour développement et production
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, 
  });
}

module.exports = sequelize;
