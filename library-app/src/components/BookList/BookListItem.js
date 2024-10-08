import React from 'react';
import BookStatus from './BookStatus';
import BookActions from './BookActions';

const BookListItem = ({ book, refreshBooks }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h3 className="card-title">{book.title}</h3>
        <p className="card-text">Auteur : {book.author}</p>
        <BookStatus status={book.status} />
        <BookActions book={book} refreshBooks={refreshBooks} />
      </div>
    </div>
  );
};

export default BookListItem;
