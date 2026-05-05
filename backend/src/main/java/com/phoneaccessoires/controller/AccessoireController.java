package com.phoneaccessoires.controller;

import com.phoneaccessoires.dto.AccessoireDTO;
import com.phoneaccessoires.dto.AccessoireResponseDTO;
import com.phoneaccessoires.dto.ApiResponse;
import com.phoneaccessoires.service.AccessoireService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/accessoires")
public class AccessoireController {

    private final AccessoireService accessoireService;

    public AccessoireController(AccessoireService accessoireService) {
        this.accessoireService = accessoireService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<AccessoireResponseDTO>>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AccessoireResponseDTO> accessoires = accessoireService.findAll(pageable);
        return ResponseEntity.ok(ApiResponse.success(accessoires, "Liste des accessoires récupérée avec succès"));
    }

    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<Page<AccessoireResponseDTO>>> filter(
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) Long categorieId,
            @RequestParam(required = false) Long marqueId,
            @RequestParam(required = false) Boolean enPromotion,
            @RequestParam(required = false) BigDecimal prixMin,
            @RequestParam(required = false) BigDecimal prixMax,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<AccessoireResponseDTO> accessoires = accessoireService.searchAdvanced(nom, categorieId, marqueId, enPromotion, prixMin, prixMax, pageable);
        return ResponseEntity.ok(ApiResponse.success(accessoires, "Résultats filtrés avec succès"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AccessoireResponseDTO>> getById(@PathVariable Long id) {
        AccessoireResponseDTO accessoire = accessoireService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(accessoire, "Accessoire récupéré avec succès"));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<AccessoireResponseDTO>>> searchByNom(@RequestParam String nom) {
        List<AccessoireResponseDTO> accessoires = accessoireService.searchByNom(nom);
        return ResponseEntity.ok(ApiResponse.success(accessoires, "Recherche effectuée"));
    }

    @GetMapping("/categorie/{categorieId}")
    public ResponseEntity<ApiResponse<Page<AccessoireResponseDTO>>> getByCategorieId(
            @PathVariable Long categorieId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AccessoireResponseDTO> accessoires = accessoireService.findByCategorieId(categorieId, pageable);
        return ResponseEntity.ok(ApiResponse.success(accessoires, "Accessoires récupérés avec succès"));
    }

    @GetMapping("/marque/{marqueId}")
    public ResponseEntity<ApiResponse<Page<AccessoireResponseDTO>>> getByMarqueId(
            @PathVariable Long marqueId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AccessoireResponseDTO> accessoires = accessoireService.findByMarqueId(marqueId, pageable);
        return ResponseEntity.ok(ApiResponse.success(accessoires, "Accessoires récupérés avec succès"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AccessoireResponseDTO>> create(@Valid @RequestBody AccessoireDTO dto) {
        AccessoireResponseDTO created = accessoireService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(created, "Accessoire créé avec succès"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AccessoireResponseDTO>> update(
            @PathVariable Long id,
            @Valid @RequestBody AccessoireDTO dto) {
        AccessoireResponseDTO updated = accessoireService.update(id, dto);
        return ResponseEntity.ok(ApiResponse.success(updated, "Accessoire mis à jour avec succès"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        accessoireService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Accessoire supprimé avec succès"));
    }
}
