package com.phoneaccessoires.controller;

import com.phoneaccessoires.dto.ApiResponse;
import com.phoneaccessoires.dto.MarqueDTO;
import com.phoneaccessoires.entity.Marque;
import com.phoneaccessoires.service.MarqueService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST pour la gestion des marques
 * Base URL: /api/marques
 */
@RestController
@RequestMapping("/api/marques")
public class MarqueController {

    private static final Logger log = LoggerFactory.getLogger(MarqueController.class);

    private final MarqueService marqueService;

    public MarqueController(MarqueService marqueService) {
        this.marqueService = marqueService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Marque>>> getAll() {
        log.info("GET /api/marques - Récupération toutes les marques");
        List<Marque> marques = marqueService.findAll();
        return ResponseEntity.ok(ApiResponse.success(marques, "Marques récupérées avec succès"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Marque>> getById(@PathVariable Long id) {
        log.info("GET /api/marques/{} - Récupération marque par ID", id);
        Marque marque = marqueService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(marque, "Marque récupérée avec succès"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Marque>> create(@Valid @RequestBody MarqueDTO dto) {
        log.info("POST /api/marques - Création marque: {}", dto.getNom());
        Marque created = marqueService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(created, "Marque créée avec succès"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Marque>> update(
            @PathVariable Long id,
            @Valid @RequestBody MarqueDTO dto) {
        log.info("PUT /api/marques/{} - Mise à jour marque", id);
        Marque updated = marqueService.update(id, dto);
        return ResponseEntity.ok(ApiResponse.success(updated, "Marque mise à jour avec succès"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        log.info("DELETE /api/marques/{} - Suppression marque", id);
        marqueService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Marque supprimée avec succès"));
    }
}
