package com.phoneaccessoires.service;

import com.phoneaccessoires.dto.MarqueDTO;
import com.phoneaccessoires.entity.Marque;
import com.phoneaccessoires.exception.ResourceNotFoundException;
import com.phoneaccessoires.repository.AccessoireRepository;
import com.phoneaccessoires.repository.MarqueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Implémentation du service Marque
 */
@Service
@Transactional
public class MarqueServiceImpl implements MarqueService {

    private static final Logger log = LoggerFactory.getLogger(MarqueServiceImpl.class);

    private final MarqueRepository marqueRepository;
    private final AccessoireRepository accessoireRepository;

    public MarqueServiceImpl(MarqueRepository marqueRepository, AccessoireRepository accessoireRepository) {
        this.marqueRepository = marqueRepository;
        this.accessoireRepository = accessoireRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Marque> findAll() {
        log.debug("Récupération de toutes les marques");
        return marqueRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Marque findById(Long id) {
        log.debug("Recherche marque avec id: {}", id);
        return marqueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Marque", "id", id));
    }

    @Override
    public Marque create(MarqueDTO dto) {
        log.debug("Création d'une nouvelle marque: {}", dto.getNom());
        Marque marque = Marque.builder()
                .nom(dto.getNom())
                .paysOrigine(dto.getPaysOrigine())
                .logoUrl(dto.getLogoUrl())
                .build();
        return marqueRepository.save(marque);
    }

    @Override
    public Marque update(Long id, MarqueDTO dto) {
        log.debug("Mise à jour marque id: {}", id);
        Marque marque = findById(id);
        marque.setNom(dto.getNom());
        marque.setPaysOrigine(dto.getPaysOrigine());
        marque.setLogoUrl(dto.getLogoUrl());
        return marqueRepository.save(marque);
    }

    @Override
    public void delete(Long id) {
        log.debug("Suppression marque id: {}", id);
        Marque marque = findById(id);

        long count = accessoireRepository.countByMarqueId(id);
        if (count > 0) {
            throw new IllegalStateException(
                    String.format("Impossible de supprimer la marque '%s': %d accessoire(s) y sont liés",
                            marque.getNom(), count));
        }
        marqueRepository.delete(marque);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Marque> searchByNom(String nom) {
        return marqueRepository.findByNomContainingIgnoreCase(nom);
    }
}
