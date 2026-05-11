package com.phoneaccessoires.controller;

import com.phoneaccessoires.dto.ApiResponse;
import com.phoneaccessoires.dto.AvisDTO;
import com.phoneaccessoires.service.AvisService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avis")
public class AvisController {

    private final AvisService avisService;

    public AvisController(AvisService avisService) {
        this.avisService = avisService;
    }

    @GetMapping("/accessoire/{id}")
    public ResponseEntity<ApiResponse<List<AvisDTO>>> getByAccessoireId(@PathVariable Long id) {
        List<AvisDTO> avisList = avisService.getByAccessoireId(id);
        return ResponseEntity.ok(ApiResponse.success(avisList, "Avis récupérés avec succès"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AvisDTO>> create(@Valid @RequestBody AvisDTO dto) {
        AvisDTO created = avisService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(created, "Avis ajouté avec succès"));
    }
}
