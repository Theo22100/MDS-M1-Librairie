import React, { useState } from 'react';
import { addBook } from '../../services/bookService';
import BookForm from '../common/BookForm';

const AddBookForm = ({ onSuccess, onError }) => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    status: 'available',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook(bookData);
      setBookData({ title: '', author: '', status: 'available' });
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  return (
    <BookForm
      bookData={bookData}
      setBookData={setBookData}
      onSubmit={handleSubmit}
    />
  );
};

export default AddBookForm;
