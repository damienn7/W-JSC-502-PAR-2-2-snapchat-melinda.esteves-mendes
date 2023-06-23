import axios from 'axios';

const API_BASE_URL = 'https://mysnapchat.epidoc.eu/api';

// Exemple d'appel GET à l'API
export const getEndpointData = (endpoint) => {
  const url = `${API_BASE_URL}/${endpoint}`;

  return axios.get(url)
    .then(response => {
      // Traitement de la réponse de l'API
      return response.data;
    })
    .catch(error => {
      // Gestion des erreurs
      throw error;
    });
};

// Exemple d'appel POST à l'API
export const login = (email, password) => {
  const url = `${API_BASE_URL}/login`;
  const data = {
    email,
    password
  };

  return axios.post(url, data)
    .then(response => {
      // Traitement de la réponse de l'API
      return response.data;
    })
    .catch(error => {
      // Gestion des erreurs
      throw error;
    });
};
