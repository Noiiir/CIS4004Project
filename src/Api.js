import { getStoredToken } from './auth/AuthTokenService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  USERS: `${API_BASE_URL}/api/users/`,
  //ITEMS: `${API_BASE_URL}/myapp/api/items/`, may not need
  CREATE: `${API_BASE_URL}/api/createUserItem/`,
  UPDATE: `${API_BASE_URL}/api/updateUserItem/`,
  RETRIEVE: `${API_BASE_URL}/api/getUserItems/`,
  DELETE: `${API_BASE_URL}/api/deleteUserItem/`,
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
    // const responseData = await response.json();

    if (!response.ok) {
      console.error('API error details:', {
        status: response.status,
        statusText: response.statusText,
        // data: responseData
      });
      // throw new Error(responseData.detail || 'Something went wrong');
    }

    return response;
  } catch (error) {
    console.error('API request error:', error);
    // return responseData;
  }
};

// Auth functions
export const loginUser = async (username, password) => {
  return apiRequest(`${API_BASE_URL}/auth/token/`, 'POST', { username, password });
};
export const getUserPk = async (id) => {
  return apiRequest(`${API_BASE_URL}/api/getUser/${id}`);
} 

export const createUserBackend = async (userData) => {
  return apiRequest(`${API_BASE_URL}/api/createUser/`, 'POST', userData);
}

// User functions
export const getUsers = async () => {
  return apiRequest(API_ENDPOINTS.USERS);
};

export const createUser = async (userData) => {
  return apiRequest(API_ENDPOINTS.USERS, 'POST', userData);
};

// Items functions
export const getItems = async (itemData) => {
  return apiRequest(API_ENDPOINTS.RETRIEVE, 'POST', itemData);
};

export const createItem = async (itemData) => {
  return apiRequest(`${API_ENDPOINTS.CREATE}`, 'POST', itemData);
};

export const updateItem = async (id, itemData) => {
  return apiRequest(`${API_ENDPOINTS.UPDATE}${id}/`, 'POST', itemData);
};

export const deleteItem = async (id) => {
  return apiRequest(`${API_ENDPOINTS.DELETE}${id}/`, 'DELETE');
};

export const getItemById = async (itemData) => {
  return apiRequest(`${API_BASE_URL}/api/getItemById/`, 'POST', itemData);
}
