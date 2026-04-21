// API configuration for JSON Server
const API_BASE_URL = 'http://localhost:3001';

// Generic API functions
class ApiClient {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  async post(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  async put(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  }

  async patch(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('PATCH request failed:', error);
      throw error;
    }
  }

  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }
}

// Create API client instance
const api = new ApiClient();

// Specific API functions for different resources
export const studentsApi = {
  getAll: () => api.get('students'),
  getById: (id) => api.get(`students/${id}`),
  create: (student) => api.post('students', student),
  update: (id, student) => api.put(`students/${id}`, student),
  delete: (id) => api.delete(`students/${id}`),
};

export const teachersApi = {
  getAll: () => api.get('teachers'),
  getById: (id) => api.get(`teachers/${id}`),
  create: (teacher) => api.post('teachers', teacher),
  update: (id, teacher) => api.put(`teachers/${id}`, teacher),
  delete: (id) => api.delete(`teachers/${id}`),
};

export const examsApi = {
  getAll: () => api.get('exams'),
  getById: (id) => api.get(`exams/${id}`),
  create: (exam) => api.post('exams', exam),
  update: (id, exam) => api.put(`exams/${id}`, exam),
  delete: (id) => api.delete(`exams/${id}`),
};

export const resultsApi = {
  getAll: () => api.get('results'),
  getById: (id) => api.get(`results/${id}`),
  create: (result) => api.post('results', result),
  update: (id, result) => api.put(`results/${id}`, result),
  delete: (id) => api.delete(`results/${id}`),
};

export default api;
