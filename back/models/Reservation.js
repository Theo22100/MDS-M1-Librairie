const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Book = require('./Book');

const Reservation = sequelize.define('Reservation', {
  reservation_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id'
    },
  }}, {
    timestamps: false,
});


User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });
Book.hasMany(Reservation, { foreignKey: 'bookId' });
Reservation.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = Reservation;
