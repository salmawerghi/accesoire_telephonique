package com.phoneaccessoires.service;

import com.phoneaccessoires.dto.AccessoireDTO;
import com.phoneaccessoires.dto.AccessoireResponseDTO;
import com.phoneaccessoires.entity.Accessoire;
import com.phoneaccessoires.entity.AccessoireImage;
import com.phoneaccessoires.entity.Categorie;
import com.phoneaccessoires.entity.Marque;
import com.phoneaccessoires.exception.ResourceNotFoundException;
import com.phoneaccessoires.repository.AccessoireRepository;
import com.phoneaccessoires.repository.CategorieRepository;
import com.phoneaccessoires.repository.MarqueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implémentation du service Accessoire avec logique métier
 */
@Service
@Transactional
public class AccessoireServiceImpl implements AccessoireService {

    private static final Logger log = LoggerFactory.getLogger(AccessoireServiceImpl.class);

    private final AccessoireRepository accessoireRepository;
    private final CategorieRepository categorieRepository;
    private final MarqueRepository marqueRepository;

    public AccessoireServiceImpl(AccessoireRepository accessoireRepository,
                                  CategorieRepository categorieRepository,
                                  MarqueRepository marqueRepository) {
        this.accessoireRepository = accessoireRepository;
        this.categorieRepository = categorieRepository;
        this.marqueRepository = marqueRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AccessoireResponseDTO> findAll(Pageable pageable) {
        return accessoireRepository.findAll(pageable).map(this::mapToResponseDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public AccessoireResponseDTO findById(Long id) {
        Accessoire accessoire = accessoireRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Accessoire", "id", id));
        return mapToResponseDTO(accessoire);
    }

    @Override
    public AccessoireResponseDTO create(AccessoireDTO dto) {
        validateAccessoireData(dto);

        // Vérifier si la référence est déjà utilisée
        if (dto.getReference() != null && !dto.getReference().trim().isEmpty()) {
            if (accessoireRepository.existsByReference(dto.getReference())) {
                throw new IllegalArgumentException("Un accessoire avec cette référence existe déjà");
            }
        }

        Categorie categorie = null;
        if (dto.getCategorieId() != null) {
            categorie = categorieRepository.findById(dto.getCategorieId())
                    .orElseThrow(() -> new ResourceNotFoundException("Catégorie", "id", dto.getCategorieId()));
        }

        Marque marque = null;
        if (dto.getMarqueId() != null) {
            marque = marqueRepository.findById(dto.getMarqueId())
                    .orElseThrow(() -> new ResourceNotFoundException("Marque", "id", dto.getMarqueId()));
        }

        Accessoire accessoire = Accessoire.builder()
                .nom(dto.getNom())
                .description(dto.getDescription())
                .prix(dto.getPrix())
                .prixAncien(dto.getPrixAncien())
                .stock(dto.getStock() != null ? dto.getStock() : 0)
                .enPromotion(dto.getEnPromotion() != null ? dto.getEnPromotion() : false)
                .garantie(dto.getGarantie())
                .caracteristiques(dto.getCaracteristiques())
                .imageUrl(dto.getImageUrl())
                .reference(dto.getReference() != null && !dto.getReference().trim().isEmpty() ? dto.getReference() : null)
                .categorie(categorie)
                .marque(marque)
                .build();

        if (dto.getImagesGallery() != null && !dto.getImagesGallery().isEmpty()) {
            List<AccessoireImage> images = dto.getImagesGallery().stream()
                    .map(url -> new AccessoireImage(url, accessoire))
                    .collect(Collectors.toList());
            accessoire.setImages(images);
        }

        Accessoire saved = accessoireRepository.save(accessoire);
        return mapToResponseDTO(saved);
    }

    @Override
    public AccessoireResponseDTO update(Long id, AccessoireDTO dto) {
        Accessoire accessoire = accessoireRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Accessoire", "id", id));

        validateAccessoireData(dto);

        String newRef = dto.getReference() != null && !dto.getReference().trim().isEmpty() ? dto.getReference() : null;
        
        if (newRef != null && !newRef.equals(accessoire.getReference())) {
            if (accessoireRepository.existsByReference(newRef)) {
                throw new IllegalArgumentException("Un accessoire avec cette référence existe déjà");
            }
        }

        Categorie categorie = null;
        if (dto.getCategorieId() != null) {
            categorie = categorieRepository.findById(dto.getCategorieId())
                    .orElseThrow(() -> new ResourceNotFoundException("Catégorie", "id", dto.getCategorieId()));
        }

        Marque marque = null;
        if (dto.getMarqueId() != null) {
            marque = marqueRepository.findById(dto.getMarqueId())
                    .orElseThrow(() -> new ResourceNotFoundException("Marque", "id", dto.getMarqueId()));
        }

        accessoire.setNom(dto.getNom());
        accessoire.setDescription(dto.getDescription());
        accessoire.setPrix(dto.getPrix());
        accessoire.setPrixAncien(dto.getPrixAncien());
        accessoire.setStock(dto.getStock() != null ? dto.getStock() : 0);
        accessoire.setEnPromotion(dto.getEnPromotion() != null ? dto.getEnPromotion() : false);
        accessoire.setGarantie(dto.getGarantie());
        accessoire.setCaracteristiques(dto.getCaracteristiques());
        accessoire.setImageUrl(dto.getImageUrl());
        accessoire.setReference(newRef);
        accessoire.setCategorie(categorie);
        accessoire.setMarque(marque);

        accessoire.getImages().clear();
        if (dto.getImagesGallery() != null && !dto.getImagesGallery().isEmpty()) {
            List<AccessoireImage> newImages = dto.getImagesGallery().stream()
                    .map(url -> new AccessoireImage(url, accessoire))
                    .collect(Collectors.toList());
            accessoire.getImages().addAll(newImages);
        }

        Accessoire updated = accessoireRepository.save(accessoire);
        return mapToResponseDTO(updated);
    }

    @Override
    public void delete(Long id) {
        Accessoire accessoire = accessoireRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Accessoire", "id", id));
        accessoireRepository.delete(accessoire);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AccessoireResponseDTO> searchByNom(String nom) {
        return accessoireRepository.findByNomContainingIgnoreCase(nom)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AccessoireResponseDTO> findByCategorieId(Long categorieId, Pageable pageable) {
        return accessoireRepository.findByCategorieId(categorieId, pageable)
                .map(this::mapToResponseDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AccessoireResponseDTO> findByMarqueId(Long marqueId, Pageable pageable) {
        return accessoireRepository.findByMarqueId(marqueId, pageable)
                .map(this::mapToResponseDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AccessoireResponseDTO> searchAdvanced(String nom, Long categorieId, Long marqueId, Boolean enPromotion, BigDecimal prixMin, BigDecimal prixMax, Pageable pageable) {
        return accessoireRepository.searchAdvanced(nom, categorieId, marqueId, enPromotion, prixMin, prixMax, pageable)
                .map(this::mapToResponseDTO);
    }

    private void validateAccessoireData(AccessoireDTO dto) {
        if (dto.getPrix() != null && dto.getPrix().signum() <= 0) {
            throw new IllegalArgumentException("Le prix doit être supérieur à 0");
        }
        if (dto.getStock() != null && dto.getStock() < 0) {
            throw new IllegalArgumentException("Le stock ne peut pas être négatif");
        }
    }

    @Override
    @org.springframework.transaction.annotation.Transactional
    public AccessoireResponseDTO applyPromotion(Long id, BigDecimal nouveauPrix) {
        Accessoire accessoire = accessoireRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Accessoire", "id", id));

        if (nouveauPrix == null || nouveauPrix.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Le prix promotionnel doit être supérieur à 0");
        }

        // Si ce n'est pas déjà en promotion, on sauvegarde le prix actuel
        if (accessoire.getPrixAncien() == null) {
            accessoire.setPrixAncien(accessoire.getPrix());
        }
        
        accessoire.setPrix(nouveauPrix);
        accessoire.setEnPromotion(true);

        Accessoire saved = accessoireRepository.save(accessoire);
        return mapToResponseDTO(saved);
    }

    private AccessoireResponseDTO mapToResponseDTO(Accessoire accessoire) {
        AccessoireResponseDTO dto = new AccessoireResponseDTO();
        dto.setId(accessoire.getId());
        dto.setNom(accessoire.getNom());
        dto.setDescription(accessoire.getDescription());
        dto.setPrix(accessoire.getPrix());
        dto.setPrixAncien(accessoire.getPrixAncien());
        dto.setStock(accessoire.getStock());
        dto.setEnPromotion(accessoire.getEnPromotion());
        dto.setGarantie(accessoire.getGarantie());
        dto.setCaracteristiques(accessoire.getCaracteristiques());
        dto.setImageUrl(accessoire.getImageUrl());
        dto.setReference(accessoire.getReference());
        
        if (accessoire.getImages() != null) {
            dto.setImagesGallery(accessoire.getImages().stream().map(AccessoireImage::getImageUrl).collect(Collectors.toList()));
        } else {
            dto.setImagesGallery(new ArrayList<>());
        }

        if (accessoire.getCategorie() != null) {
            dto.setCategorieId(accessoire.getCategorie().getId());
            dto.setCategorieNom(accessoire.getCategorie().getNom());
        }
        if (accessoire.getMarque() != null) {
            dto.setMarqueId(accessoire.getMarque().getId());
            dto.setMarqueNom(accessoire.getMarque().getNom());
            dto.setMarqueLogoUrl(accessoire.getMarque().getLogoUrl());
        }
        dto.setCreatedAt(accessoire.getCreatedAt());
        dto.setUpdatedAt(accessoire.getUpdatedAt());
        return dto;
    }
}
