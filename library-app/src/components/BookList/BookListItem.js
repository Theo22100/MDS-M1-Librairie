import React from 'react';
import './css/BookList.css';

const BookListItem = ({ book }) => {
  return (
    <div className="book-list-item">
      <h3>{book.title}</h3>
      <p>Auteur : {book.author}</p>
      <p>Statut : {book.status}</p>
    </div>
  );
};

export default BookListItem;
