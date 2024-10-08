import httpClient from './httpService';

const API_URL = `${process.env.REACT_APP_API_URL}/reservations`;

export const getAllReservations = async () => {
  try {
    const response = await httpClient.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addReservation = async (reservationData) => {
  try {
    const response = await httpClient.post(API_URL, reservationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateReservation = async (id, reservationData) => {
  try {
    const response = await httpClient.put(`${API_URL}/${id}`, reservationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReservation = async (id) => {
  try {
    const response = await httpClient.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
