package com.phoneaccessoires.service;

import com.phoneaccessoires.dto.AccessoireDTO;
import com.phoneaccessoires.dto.AccessoireResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.math.BigDecimal;

import java.util.List;

/**
 * Interface du service pour la gestion des accessoires
 */
public interface AccessoireService {

    Page<AccessoireResponseDTO> findAll(Pageable pageable);

    AccessoireResponseDTO findById(Long id);

    AccessoireResponseDTO create(AccessoireDTO dto);

    AccessoireResponseDTO update(Long id, AccessoireDTO dto);

    void delete(Long id);

    List<AccessoireResponseDTO> searchByNom(String nom);

    Page<AccessoireResponseDTO> findByCategorieId(Long categorieId, Pageable pageable);

    Page<AccessoireResponseDTO> findByMarqueId(Long marqueId, Pageable pageable);

    Page<AccessoireResponseDTO> searchAdvanced(String nom, Long categorieId, Long marqueId, Boolean enPromotion, BigDecimal prixMin, BigDecimal prixMax, Pageable pageable);

    AccessoireResponseDTO applyPromotion(Long id, BigDecimal nouveauPrix);
}
