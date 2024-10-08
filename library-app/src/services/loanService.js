import httpClient from './httpService';

const API_URL = `${process.env.REACT_APP_API_URL}/loans`;

export const getAllLoans = async () => {
  try {
    const response = await httpClient.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLoansUser = async (userId) => {
  try {
    const response = await httpClient.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const addLoan = async (loanData) => {
  try {
    const response = await httpClient.post(API_URL, loanData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLoan = async (id, loanData) => {
  try {
    const response = await httpClient.put(`${API_URL}/${id}`, loanData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLoan = async (id) => {
  try {
    const response = await httpClient.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const returnLoan = async (id) => {
  try {
    const response = await httpClient.put(`${API_URL}/${id}/return`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
