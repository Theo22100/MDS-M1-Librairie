import httpClient from './httpService';

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

export const registerUser = async (userData) => {
  try {
    const response = await httpClient.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await httpClient.post(`${API_URL}/login`, userData);
    
    // Save token JWT
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token'); // Supprimer token JWT
};

export const getAllUsers = async () => {
  try {
    const response = await httpClient.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await httpClient.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await httpClient.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
