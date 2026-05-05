package com.phoneaccessoires.service;

import com.phoneaccessoires.dto.CategorieDTO;
import com.phoneaccessoires.entity.Categorie;

import java.util.List;

/**
 * Interface du service pour la gestion des catégories
 */
public interface CategorieService {

    List<Categorie> findAll();

    Categorie findById(Long id);

    Categorie create(CategorieDTO dto);

    Categorie update(Long id, CategorieDTO dto);

    void delete(Long id);

    List<Categorie> searchByNom(String nom);
}
