package com.phoneaccessoires.controller;

import com.phoneaccessoires.dto.ApiResponse;
import com.phoneaccessoires.dto.CommandeRequestDTO;
import com.phoneaccessoires.dto.CommandeResponseDTO;
import com.phoneaccessoires.dto.DailyStatDTO;
import com.phoneaccessoires.service.CommandeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commandes")
public class CommandeController {

    private final CommandeService commandeService;

    public CommandeController(CommandeService commandeService) {
        this.commandeService = commandeService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CommandeResponseDTO>> create(@Valid @RequestBody CommandeRequestDTO dto) {
        CommandeResponseDTO created = commandeService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(created, "Commande enregistrée avec succès"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CommandeResponseDTO>>> getAll() {
        List<CommandeResponseDTO> commandes = commandeService.findAll();
        return ResponseEntity.ok(ApiResponse.success(commandes, "Commandes récupérées avec succès"));
    }

    @GetMapping("/stats/daily")
    public ResponseEntity<ApiResponse<List<DailyStatDTO>>> getDailyStats() {
        List<DailyStatDTO> stats = commandeService.getDailyStats();
        return ResponseEntity.ok(ApiResponse.success(stats, "Statistiques récupérées avec succès"));
    }
}
