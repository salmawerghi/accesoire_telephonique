package com.phoneaccessoires.service;

import com.phoneaccessoires.dto.CategorieDTO;
import com.phoneaccessoires.entity.Categorie;
import com.phoneaccessoires.exception.ResourceNotFoundException;
import com.phoneaccessoires.repository.AccessoireRepository;
import com.phoneaccessoires.repository.CategorieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Implémentation du service Catégorie
 */
@Service
@Transactional
public class CategorieServiceImpl implements CategorieService {

    private static final Logger log = LoggerFactory.getLogger(CategorieServiceImpl.class);

    private final CategorieRepository categorieRepository;
    private final AccessoireRepository accessoireRepository;

    public CategorieServiceImpl(CategorieRepository categorieRepository, AccessoireRepository accessoireRepository) {
        this.categorieRepository = categorieRepository;
        this.accessoireRepository = accessoireRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Categorie> findAll() {
        log.debug("Récupération de toutes les catégories");
        return categorieRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Categorie findById(Long id) {
        log.debug("Recherche catégorie avec id: {}", id);
        return categorieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Catégorie", "id", id));
    }

    @Override
    public Categorie create(CategorieDTO dto) {
        log.debug("Création d'une nouvelle catégorie: {}", dto.getNom());
        Categorie categorie = Categorie.builder()
                .nom(dto.getNom())
                .description(dto.getDescription())
                .build();
        return categorieRepository.save(categorie);
    }

    @Override
    public Categorie update(Long id, CategorieDTO dto) {
        log.debug("Mise à jour catégorie id: {}", id);
        Categorie categorie = findById(id);
        categorie.setNom(dto.getNom());
        categorie.setDescription(dto.getDescription());
        return categorieRepository.save(categorie);
    }

    @Override
    public void delete(Long id) {
        log.debug("Suppression catégorie id: {}", id);
        Categorie categorie = findById(id);

        // Vérifier si des accessoires sont liés à cette catégorie
        long count = accessoireRepository.countByCategorieId(id);
        if (count > 0) {
            throw new IllegalStateException(
                    String.format("Impossible de supprimer la catégorie '%s': %d accessoire(s) y sont liés",
                            categorie.getNom(), count));
        }
        categorieRepository.delete(categorie);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Categorie> searchByNom(String nom) {
        return categorieRepository.findByNomContainingIgnoreCase(nom);
    }
}
