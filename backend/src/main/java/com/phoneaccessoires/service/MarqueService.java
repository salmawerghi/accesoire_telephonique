package com.phoneaccessoires.service;

import com.phoneaccessoires.dto.MarqueDTO;
import com.phoneaccessoires.entity.Marque;

import java.util.List;

/**
 * Interface du service pour la gestion des marques
 */
public interface MarqueService {

    List<Marque> findAll();

    Marque findById(Long id);

    Marque create(MarqueDTO dto);

    Marque update(Long id, MarqueDTO dto);

    void delete(Long id);

    List<Marque> searchByNom(String nom);
}
