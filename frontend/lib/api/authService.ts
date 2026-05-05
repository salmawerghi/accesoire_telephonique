import api from './axios';

export interface AuthResponse {
  token: string;
}

export const authService = {
  login: async (data: any) => {
    const response = await api.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  },
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },
  getRole: () => {
    const token = authService.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role; // Assumes the backend puts the role in the JWT
    } catch (e) {
      return null;
    }
  },
  isAuthenticated: () => {
    return !!authService.getToken();
  }
};
