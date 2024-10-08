import React, { useEffect, useState } from "react";
import { getAllBooks } from "../../services/bookService";
import BookListItem from "./BookListItem";

const BookList = () => {
  const [books, setBooks] = useState([]);

  // Fonction pour récupérer tous les livres depuis l'API
  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des livres :", error);
    }
  };

  // Chargement initial livres
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fonction de rafraîchissement emprunt/reserv
  const refreshBooks = async () => {
    await fetchBooks(); 
  };

  return (
    <div className="row">
      {books.map((book) => (
        <div key={book.id} className="col-md-6 mb-4">
          <BookListItem book={book} refreshBooks={refreshBooks} />
        </div>
      ))}
    </div>
  );
};

export default BookList;
