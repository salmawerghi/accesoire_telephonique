import api from './axios';

export interface LigneCommandeRequestDTO {
  accessoireId: number;
  quantite: number;
}

export interface CommandeRequestDTO {
  prenom: string;
  nom: string;
  adresse: string;
  ville: string;
  telephone: string;
  methodPaiement: string;
  lignes: LigneCommandeRequestDTO[];
}

export interface LigneCommandeResponseDTO {
  id: number;
  accessoireId: number;
  accessoireNom: string;
  quantite: number;
  prixUnitaire: number;
}

export interface CommandeResponseDTO {
  id: number;
  prenom: string;
  nom: string;
  adresse: string;
  ville: string;
  telephone: string;
  methodPaiement: string;
  total: number;
  createdAt: string;
  lignes: LigneCommandeResponseDTO[];
}

export interface DailyStatDTO {
  date: string;
  commandeCount: number;
  totalRevenue: number;
}

export const commandeService = {
  create: async (data: CommandeRequestDTO) => {
    const response = await api.post('/commandes', data);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/commandes');
    return response.data;
  },
  getDailyStats: async () => {
    const response = await api.get('/commandes/stats/daily');
    return response.data;
  }
};
