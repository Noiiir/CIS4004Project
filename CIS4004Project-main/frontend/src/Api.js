import { getStoredToken } from './auth/AuthTokenService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
    CONSOLES: `${API_BASE_URL}/api/consoles/`,
    GAMES: `${API_BASE_URL}/api/games/`,
};

const getAuth0Token = async () => {
  return getStoredToken();
};

const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const token = await getAuth0Token();
  
  const config = {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(endpoint, config);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
};

// Auth functions
export const loginUser = async (username, password) => {
  
  return apiRequest(`${API_BASE_URL}/auth/token/`, 'POST', { username, password });
};

// User functions
export const getUsers = async () => {
  return apiRequest(API_ENDPOINTS.USERS);
};

export const createUser = async (userData) => {
  return apiRequest(API_ENDPOINTS.USERS, 'POST', userData);
};

// Items functions
export const getItems = async () => {
  return apiRequest(API_ENDPOINTS.ITEMS);
};

export const createItem = async (itemData) => {
  return apiRequest(API_ENDPOINTS.ITEMS, 'POST', itemData);
};

export const updateItem = async (id, itemData) => {
  return apiRequest(`${API_ENDPOINTS.ITEMS}${id}/`, 'PUT', itemData);
};

export const deleteItem = async (id) => {
  return apiRequest(`${API_ENDPOINTS.ITEMS}${id}/`, 'DELETE');
};

