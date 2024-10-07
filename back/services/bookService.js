const Book = require('../models/Book');

const getAllBooks = async () => {
  return await Book.findAll();
};

const addBook = async (data) => {
  return await Book.create(data);
};

const updateBook = async (id, data) => {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error('Livre non trouvé');
  }
  return await book.update(data);
};

const deleteBook = async (id) => {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error('Livre non trouvé');
  }
  await book.destroy();
  return { message: 'Livre supprimé avec succès' };
};

module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
};
