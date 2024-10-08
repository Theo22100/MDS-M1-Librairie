import httpClient from './httpService';

const API_URL = `${process.env.REACT_APP_API_URL}/books`;

export const getAllBooks = async () => {
  try {
    const response = await httpClient.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addBook = async (bookData) => {
  try {
    const response = await httpClient.post(API_URL, bookData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const response = await httpClient.put(`${API_URL}/${id}`, bookData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await httpClient.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
