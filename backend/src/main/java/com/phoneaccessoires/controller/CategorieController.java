package com.phoneaccessoires.controller;

import com.phoneaccessoires.dto.ApiResponse;
import com.phoneaccessoires.dto.CategorieDTO;
import com.phoneaccessoires.entity.Categorie;
import com.phoneaccessoires.service.CategorieService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST pour la gestion des catégories
 * Base URL: /api/categories
 */
@RestController
@RequestMapping("/api/categories")
public class CategorieController {

    private static final Logger log = LoggerFactory.getLogger(CategorieController.class);

    private final CategorieService categorieService;

    public CategorieController(CategorieService categorieService) {
        this.categorieService = categorieService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Categorie>>> getAll() {
        log.info("GET /api/categories - Récupération toutes les catégories");
        List<Categorie> categories = categorieService.findAll();
        return ResponseEntity.ok(ApiResponse.success(categories, "Catégories récupérées avec succès"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Categorie>> getById(@PathVariable Long id) {
        log.info("GET /api/categories/{} - Récupération catégorie par ID", id);
        Categorie categorie = categorieService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(categorie, "Catégorie récupérée avec succès"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Categorie>> create(@Valid @RequestBody CategorieDTO dto) {
        log.info("POST /api/categories - Création catégorie: {}", dto.getNom());
        Categorie created = categorieService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(created, "Catégorie créée avec succès"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Categorie>> update(
            @PathVariable Long id,
            @Valid @RequestBody CategorieDTO dto) {
        log.info("PUT /api/categories/{} - Mise à jour catégorie", id);
        Categorie updated = categorieService.update(id, dto);
        return ResponseEntity.ok(ApiResponse.success(updated, "Catégorie mise à jour avec succès"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        log.info("DELETE /api/categories/{} - Suppression catégorie", id);
        categorieService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Catégorie supprimée avec succès"));
    }
}
