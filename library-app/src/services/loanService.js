import axios from 'axios';

const API_URL = 'http://localhost:5000/api/loans';

export const getAllLoans = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addLoan = async (loanData) => {
  try {
    const response = await axios.post(API_URL, loanData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLoan = async (id, loanData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, loanData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLoan = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const returnLoan = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/return`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
