const { Sequelize } = require('sequelize');

// Config env
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, // eviter logs sql
});

module.exports = sequelize;
