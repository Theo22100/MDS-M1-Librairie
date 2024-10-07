const request = require('supertest');
const app = require('../server'); 
const sequelize = require('../config/db'); 
const Loan = require('../models/Loan');
const Book = require('../models/Book');
const User = require('../models/User');
const Reservation = require('../models/Reservation');

describe('Return - Return Book', () => {
  beforeAll(async () => {
    // Synchro bdd avant test
    await sequelize.sync({ force: true });

    // Initialiser données de test
    await User.create({ name: 'Théo', firstname: 'Bob', mail: 'theo@gmail.com', password: 'password' });
    await Book.create({ title: 'Les Misérables', author: 'Victor Hugo', status: 'borrowed' });
    await Loan.create({ userId: 1, bookId: 1, loan_date: new Date(), return_date: null });
    await User.create({ name: 'Lei', firstname: 'Patrick', mail: 'lei@gmail.com', password: 'password' });
    await Reservation.create({ userId: 2, bookId: 1, reservation_date: new Date() });
  });

  afterAll(async () => {
    // Fermer co après test
    await sequelize.close();
  });

  test('Doit rendre le livre et l\'attribuer à la prochaine réservation', async () => {
    const response = await request(app).put('/api/loans/1/return');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Livre retourné et prêt attribué à la prochaine réservation');

    // Vérifier que l'emprunt a une date de retour
    const updatedLoan = await Loan.findByPk(1);
    expect(updatedLoan.return_date).not.toBeNull();

    // Vérifier que le livre est de nouveau emprunté
    const updatedBook = await Book.findByPk(1);
    expect(updatedBook.status).toBe('borrowed');

    // Vérifier qu'une nouvelle réservation a été attribuée et que la réservation est supprimée
    const nextLoan = await Loan.findOne({ where: { userId: 2, bookId: 1, return_date: null } });
    expect(nextLoan).not.toBeNull();
    const deletedReservation = await Reservation.findByPk(1);
    expect(deletedReservation).toBeNull();
  });

  test('Doit rendre le livre et l\'attribuer à la prochaine réservation et le mettre à disposition si pas de réservation', async () => {
    // Créer un nouvel emprunt pour le livre avec l'utilisateur 1 
    const newLoan = await Loan.create({ userId: 1, bookId: 1, loan_date: new Date(), return_date: null });
    console.log('Loan created:', newLoan);
  
    // Supprimer toute réservation existante pour le livre
    await Reservation.destroy({ where: { id: 1 } });
    console.log('Reservation deleted.');
  
    // Envoyer la requête de retour du livre
    const response = await request(app).put(`/api/loans/${newLoan.id}/return`);
    console.log('Response:', response.body);
  
    // Vérifier la réponse
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Livre retourné avec succès et est maintenant disponible');
  
    // Vérifier que le prêt a une date de retour
    const updatedLoan = await Loan.findOne({ where: { userId: 1, bookId: 1 }, order: [['loan_date', 'DESC']] });
    console.log('Updated Loan:', updatedLoan);
    expect(updatedLoan.return_date).not.toBeNull();
  
    // Vérifier que le livre est maintenant disponible
    const updatedBook = await Book.findByPk(1);
    console.log('Updated Book:', updatedBook);
    expect(updatedBook.status).toBe('available');
  });
  
});
