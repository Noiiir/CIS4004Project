const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// API endpoints
export const API_ENDPOINTS = {
    USERS: `${API_BASE_URL}/myapp/api/users/`,
    ITEMS: `${API_BASE_URL}/myapp/api/items/`,
    PROTECTED: `${API_BASE_URL}/auth/protected/`,
    GAMES: `${API_BASE_URL}/myapp/api/games/`,
    CONSOLES: `${API_BASE_URL}/myapp/api/consoles/`,
};

// Import the token helper
import { getStoredToken } from './auth/AuthTokenService';

// Helper function to get Auth0 token
const getAuth0Token = async () => {
    return getStoredToken();
};

// Custom error class for API errors
export class APIError extends Error {
    constructor(message, status, data = null) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.data = data;
    }
}

// API request function with token support
export const apiRequest = async (endpoint, method = 'GET', data = null, token = null) => {
    try {
        // Get token if not provided
        const authToken = token || await getAuth0Token();
        
        // Prepare headers
        const headers = {
            'Content-Type': 'application/json',
        };

        // Add authorization header if token exists
        if (authToken) {
            headers.Authorization = `Bearer ${authToken}`;
        }

        // Prepare request options
        const requestOptions = {
            method,
            headers,
            credentials: 'include', // Include cookies if needed
        };

        // Add body for non-GET requests
        if (data && method !== 'GET') {
            requestOptions.body = JSON.stringify(data);
        }

        // Make the request
        const response = await fetch(endpoint, requestOptions);

        // Handle different response types
        let responseData;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            responseData = await response.json();
        } else {
            responseData = await response.text();
        }

        // Check if response is ok (status in 200-299 range)
        if (!response.ok) {
            throw new APIError(
                responseData.message || 'API request failed',
                response.status,
                responseData
            );
        }

        return responseData;

    } catch (error) {
        if (error instanceof APIError) {
            throw error;
        }

        // Handle network errors
        if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
            throw new APIError('Network error - Unable to connect to the server', 0);
        }

        // Handle other errors
        throw new APIError(error.message || 'Unknown error occurred', 500);
    }
};

// Convenience methods for common API operations
export const api = {
    get: async (endpoint, token = null) => {
        return apiRequest(endpoint, 'GET', null, token);
    },

    post: async (endpoint, data, token = null) => {
        return apiRequest(endpoint, 'POST', data, token);
    },

    put: async (endpoint, data, token = null) => {
        return apiRequest(endpoint, 'PUT', data, token);
    },

    patch: async (endpoint, data, token = null) => {
        return apiRequest(endpoint, 'PATCH', data, token);
    },

    delete: async (endpoint, token = null) => {
        return apiRequest(endpoint, 'DELETE', null, token);
    }
};

// Example usage functions
export const apiServices = {
    // User-related operations
    users: {
        getProfile: async () => api.get(API_ENDPOINTS.USERS + 'profile/'),
        updateProfile: async (data) => api.patch(API_ENDPOINTS.USERS + 'profile/', data),
    },

    // Games-related operations
    games: {
        getAll: async () => api.get(API_ENDPOINTS.GAMES),
        getById: async (id) => api.get(`${API_ENDPOINTS.GAMES}${id}/`),
        create: async (data) => api.post(API_ENDPOINTS.GAMES, data),
        update: async (id, data) => api.put(`${API_ENDPOINTS.GAMES}${id}/`, data),
        delete: async (id) => api.delete(`${API_ENDPOINTS.GAMES}${id}/`),
    },

    // Consoles-related operations
    consoles: {
        getAll: async () => api.get(API_ENDPOINTS.CONSOLES),
        getById: async (id) => api.get(`${API_ENDPOINTS.CONSOLES}${id}/`),
        create: async (data) => api.post(API_ENDPOINTS.CONSOLES, data),
        update: async (id, data) => api.put(`${API_ENDPOINTS.CONSOLES}${id}/`, data),
        delete: async (id) => api.delete(`${API_ENDPOINTS.CONSOLES}${id}/`),
    },

    // Protected route test
    protected: {
        test: async () => api.get(API_ENDPOINTS.PROTECTED),
    }
};