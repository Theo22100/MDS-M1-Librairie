import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../../services/bookService';
import BookListItem from './BookListItem';
import './css/BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres :', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
