import api from './axios';

export interface Marque {
  id: number;
  nom: string;
  paysOrigine?: string;
  logoUrl?: string;
}

export const marqueService = {
  getAll: async () => {
    const response = await api.get('/marques');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/marques/${id}`);
    return response.data;
  },
  create: async (data: Omit<Marque, 'id'>) => {
    const response = await api.post('/marques', data);
    return response.data;
  },
  update: async (id: number, data: Omit<Marque, 'id'>) => {
    const response = await api.put(`/marques/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/marques/${id}`);
    return response.data;
  }
};
