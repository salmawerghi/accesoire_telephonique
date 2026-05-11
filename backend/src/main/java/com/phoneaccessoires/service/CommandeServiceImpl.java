package com.phoneaccessoires.service;

import com.phoneaccessoires.dto.*;
import com.phoneaccessoires.entity.Accessoire;
import com.phoneaccessoires.entity.Commande;
import com.phoneaccessoires.entity.LigneCommande;
import com.phoneaccessoires.exception.ResourceNotFoundException;
import com.phoneaccessoires.repository.AccessoireRepository;
import com.phoneaccessoires.repository.CommandeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Service
@Transactional
public class CommandeServiceImpl implements CommandeService {

    private final CommandeRepository commandeRepository;
    private final AccessoireRepository accessoireRepository;

    public CommandeServiceImpl(CommandeRepository commandeRepository, AccessoireRepository accessoireRepository) {
        this.commandeRepository = commandeRepository;
        this.accessoireRepository = accessoireRepository;
    }

    @Override
    public CommandeResponseDTO create(CommandeRequestDTO dto) {
        Commande commande = new Commande();
        commande.setPrenom(dto.getPrenom());
        commande.setNom(dto.getNom());
        commande.setAdresse(dto.getAdresse());
        commande.setVille(dto.getVille());
        commande.setTelephone(dto.getTelephone());
        commande.setMethodPaiement(dto.getMethodPaiement());

        BigDecimal total = BigDecimal.ZERO;

        for (LigneCommandeRequestDTO ligneDto : dto.getLignes()) {
            Accessoire accessoire = accessoireRepository.findById(ligneDto.getAccessoireId())
                    .orElseThrow(() -> new ResourceNotFoundException("Accessoire", "id", ligneDto.getAccessoireId()));

            // Vérification et mise à jour du stock
            if (accessoire.getStock() < ligneDto.getQuantite()) {
                throw new IllegalArgumentException("Stock insuffisant pour l'accessoire: " + accessoire.getNom());
            }
            accessoire.setStock(accessoire.getStock() - ligneDto.getQuantite());
            accessoireRepository.save(accessoire);

            LigneCommande ligne = new LigneCommande();
            ligne.setCommande(commande);
            ligne.setAccessoire(accessoire);
            ligne.setQuantite(ligneDto.getQuantite());
            ligne.setPrixUnitaire(accessoire.getPrix());

            commande.getLignes().add(ligne);
            total = total.add(accessoire.getPrix().multiply(new BigDecimal(ligneDto.getQuantite())));
        }

        commande.setTotal(total);
        Commande savedCommande = commandeRepository.save(commande);
        
        return mapToDTO(savedCommande);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommandeResponseDTO> findAll() {
        return commandeRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DailyStatDTO> getDailyStats() {
        List<Commande> all = commandeRepository.findAll();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Groupement par date avec TreeMap pour garder l'ordre chronologique
        Map<String, List<Commande>> grouped = all.stream()
                .collect(Collectors.groupingBy(
                        c -> c.getCreatedAt().toLocalDate().format(formatter),
                        TreeMap::new,
                        Collectors.toList()
                ));

        return grouped.entrySet().stream().map(entry -> {
            long count = entry.getValue().size();
            BigDecimal total = entry.getValue().stream()
                    .map(Commande::getTotal)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            return new DailyStatDTO(entry.getKey(), count, total);
        }).collect(Collectors.toList());
    }

    private CommandeResponseDTO mapToDTO(Commande commande) {
        CommandeResponseDTO dto = new CommandeResponseDTO();
        dto.setId(commande.getId());
        dto.setPrenom(commande.getPrenom());
        dto.setNom(commande.getNom());
        dto.setAdresse(commande.getAdresse());
        dto.setVille(commande.getVille());
        dto.setTelephone(commande.getTelephone());
        dto.setMethodPaiement(commande.getMethodPaiement());
        dto.setTotal(commande.getTotal());
        dto.setCreatedAt(commande.getCreatedAt());

        List<LigneCommandeResponseDTO> lignes = commande.getLignes().stream().map(ligne -> {
            LigneCommandeResponseDTO lDto = new LigneCommandeResponseDTO();
            lDto.setId(ligne.getId());
            lDto.setAccessoireId(ligne.getAccessoire().getId());
            lDto.setAccessoireNom(ligne.getAccessoire().getNom());
            lDto.setQuantite(ligne.getQuantite());
            lDto.setPrixUnitaire(ligne.getPrixUnitaire());
            return lDto;
        }).collect(Collectors.toList());

        dto.setLignes(lignes);
        return dto;
    }
}
