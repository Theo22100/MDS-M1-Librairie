import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("Une erreur s'est produite lors de la récupération des livres !", error);
      });
  }, []);

  return (
    <div>
      <h1>Livres disponibles</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> par {book.author} - Statut : {book.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
