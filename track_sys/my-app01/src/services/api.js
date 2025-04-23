// Base URL for API requests
const API_URL = 'http://localhost:5000/api';

// Auth API calls
export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return { success: response.ok, data };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return { success: false, error: 'No authentication token' };
      }
      
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error('Get profile error:', error);
      return { success: false, error: error.message };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Assets API calls
export const assetService = {
  // Get all assets
  getAssets: async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return { success: false, error: 'No authentication token' };
      }
      
      const response = await fetch(`${API_URL}/assets/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error('Get assets error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get a specific asset
  getAsset: async (assetId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return { success: false, error: 'No authentication token' };
      }
      
      const response = await fetch(`${API_URL}/assets/${assetId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error('Get asset error:', error);
      return { success: false, error: error.message };
    }
  },

  // Create a new asset
  createAsset: async (assetData) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return { success: false, error: 'No authentication token' };
      }
      
      const response = await fetch(`${API_URL}/assets/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assetData),
      });
      
      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error('Create asset error:', error);
      return { success: false, error: error.message };
    }
  },

  // Update an asset
  updateAsset: async (assetId, assetData) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return { success: false, error: 'No authentication token' };
      }
      
      const response = await fetch(`${API_URL}/assets/${assetId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assetData),
      });
      
      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error('Update asset error:', error);
      return { success: false, error: error.message };
    }
  },

  // Delete an asset
  deleteAsset: async (assetId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return { success: false, error: 'No authentication token' };
      }
      
      const response = await fetch(`${API_URL}/assets/${assetId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error('Delete asset error:', error);
      return { success: false, error: error.message };
    }
  }
};