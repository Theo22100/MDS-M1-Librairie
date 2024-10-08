const BookDTO = require('../dtos/BookDTO');
const bookService = require('../services/bookService');

// Récupération de tous les livres
const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    const booksDTO = books.map((book) => new BookDTO(book));
    res.json(booksDTO);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Création livre
const addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = await bookService.addBook({ title, author, status: 'available' });
    res.status(201).json(new BookDTO(newBook));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mise à jour livre
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;
    const updatedBook = await bookService.updateBook(id, { title, author });
    res.json(new BookDTO(updatedBook));
  } catch (err) {
    if (err.message === 'Livre non trouvé') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

// Suppression livre
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await bookService.deleteBook(id);
    res.json(message);
  } catch (err) {
    if (err.message === 'Livre non trouvé') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
};
