import { jwtDecode } from 'jwt-decode'; 

// Fonction pour RECUP token depuis localStorage
export const getToken = () => {
  return localStorage.getItem('token'); 
};

// Fonction pour STOCKER token dans localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token); 
};

// Fonction pour SUPPRIMER token du localStorage
export const removeToken = () => {
  localStorage.removeItem('token'); 
};

// Fonction pour EXTRAIRE ID user depuis token JWT
export const getUserIdFromToken = () => {
  const token = getToken(); 
  if (!token) return null; 
  const decodedToken = jwtDecode(token); 
  return decodedToken.id; 
};

// Fonction pour EXTRAIRE Admin depuis token JWT
export const getUserAdminFromToken = () => {
  const token = getToken(); 
  if (!token) return null; 
  const decodedToken = jwtDecode(token); 
  return decodedToken.admin; 
};
