import { getStoredToken } from './auth/AuthTokenService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';


export const API_ENDPOINTS = {
  USERS: `${API_BASE_URL}/myapp/api/users/`,
  ITEMS: `${API_BASE_URL}/myapp/api/items/`,
};




const getAuth0Token = async () => {
  return getStoredToken();
};


export const apiRequest = async (endpoint, method = 'GET', data = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

 
  if (!token) {
    token = await getAuth0Token();
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(endpoint, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.detail || 'Something went wrong');
    }

    return responseData;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
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