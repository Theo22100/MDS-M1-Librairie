import axios from 'axios';

// Créer une instance Axios avec baseURL
const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Injecter le token JWT dans les requêtes
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Ajouter token JWT
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Ajouter un intercepteur pour gérer les réponses et les erreurs globales
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Renvoie vers login si pas accès
    if (error.response.status === 401) {
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default httpClient;
