import api from './axios';

export interface Categorie {
  id: number;
  nom: string;
  description: string;
}

export const categorieService = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
  create: async (data: Omit<Categorie, 'id'>) => {
    const response = await api.post('/categories', data);
    return response.data;
  },
  update: async (id: number, data: Omit<Categorie, 'id'>) => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  }
};
