import api from './axios';

export interface Categorie {
  id: number;
  nom: string;
}

export interface Marque {
  id: number;
  nom: string;
  logoUrl: string;
}

export interface Accessoire {
  id: number;
  nom: string;
  description?: string;
  prix: number;
  prixAncien?: number;
  stock: number;
  enPromotion?: boolean;
  garantie?: string;
  caracteristiques?: string;
  imageUrl?: string;
  imagesGallery?: string[];
  reference?: string;
  categorieId?: number;
  categorieNom?: string;
  marqueId?: number;
  marqueNom?: string;
  marqueLogoUrl?: string;
}

export interface AccessoireDTO {
  nom: string;
  description?: string;
  prix: number;
  prixAncien?: number;
  stock: number;
  enPromotion?: boolean;
  garantie?: string;
  caracteristiques?: string;
  imageUrl?: string;
  imagesGallery?: string[];
  reference?: string;
  categorieId?: number;
  marqueId?: number;
}

export const accessoireService = {
  getAll: async (page = 0, size = 10) => {
    const response = await api.get(`/accessoires?page=${page}&size=${size}`);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/accessoires/${id}`);
    return response.data;
  },
  search: async (nom: string) => {
    const response = await api.get(`/accessoires/search?nom=${nom}`);
    return response.data;
  },
  getByCategorie: async (categorieId: number, page = 0, size = 10) => {
    const response = await api.get(`/accessoires/categorie/${categorieId}?page=${page}&size=${size}`);
    return response.data;
  },
  getByMarque: async (marqueId: number, page = 0, size = 10) => {
    const response = await api.get(`/accessoires/marque/${marqueId}?page=${page}&size=${size}`);
    return response.data;
  },
  filter: async (params: { nom?: string, categorieId?: number, marqueId?: number, enPromotion?: boolean, prixMin?: number, prixMax?: number, page?: number, size?: number, sortBy?: string, sortDir?: string }) => {
    const queryParams = new URLSearchParams();
    if (params.nom) queryParams.append('nom', params.nom);
    if (params.categorieId) queryParams.append('categorieId', params.categorieId.toString());
    if (params.marqueId) queryParams.append('marqueId', params.marqueId.toString());
    if (params.enPromotion) queryParams.append('enPromotion', params.enPromotion.toString());
    if (params.prixMin) queryParams.append('prixMin', params.prixMin.toString());
    if (params.prixMax) queryParams.append('prixMax', params.prixMax.toString());
    if (params.page !== undefined) queryParams.append('page', params.page.toString());
    if (params.size !== undefined) queryParams.append('size', params.size.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortDir) queryParams.append('sortDir', params.sortDir);
    
    const response = await api.get(`/accessoires/filter?${queryParams.toString()}`);
    return response.data;
  },
  create: async (data: AccessoireDTO) => {
    const response = await api.post('/accessoires', data);
    return response.data;
  },
  update: async (id: number, data: AccessoireDTO) => {
    const response = await api.put(`/accessoires/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/accessoires/${id}`);
    return response.data;
  }
};
