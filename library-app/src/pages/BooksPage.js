import React from 'react';
import BookList from '../components/BookList/BookList';

const BooksPage = () => {
  return (
    <div className="container">
      <h1 className="my-4">Liste des livres</h1>
      <BookList />
    </div>
  );
};

export default BooksPage;
