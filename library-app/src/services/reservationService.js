import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reservations';

export const getAllReservations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addReservation = async (reservationData) => {
  try {
    const response = await axios.post(API_URL, reservationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateReservation = async (id, reservationData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, reservationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReservation = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
