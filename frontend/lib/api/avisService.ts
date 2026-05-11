import api from './axios';

export interface AvisDTO {
  id?: number;
  note: number;
  commentaire: string;
  nomUtilisateur?: string;
  accessoireId: number;
  createdAt?: string;
}

export const avisService = {
  getByAccessoireId: async (accessoireId: number) => {
    const response = await api.get(`/avis/accessoire/${accessoireId}`);
    return response.data;
  },
  create: async (data: AvisDTO) => {
    const response = await api.post('/avis', data);
    return response.data;
  }
};
