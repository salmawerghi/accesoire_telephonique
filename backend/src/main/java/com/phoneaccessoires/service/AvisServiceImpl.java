package com.phoneaccessoires.service;

import com.phoneaccessoires.dto.AvisDTO;
import com.phoneaccessoires.entity.Accessoire;
import com.phoneaccessoires.entity.Avis;
import com.phoneaccessoires.entity.Utilisateur;
import com.phoneaccessoires.exception.ResourceNotFoundException;
import com.phoneaccessoires.repository.AccessoireRepository;
import com.phoneaccessoires.repository.AvisRepository;
import com.phoneaccessoires.repository.UtilisateurRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AvisServiceImpl implements AvisService {

    private final AvisRepository avisRepository;
    private final AccessoireRepository accessoireRepository;
    private final UtilisateurRepository utilisateurRepository;

    public AvisServiceImpl(AvisRepository avisRepository, AccessoireRepository accessoireRepository, UtilisateurRepository utilisateurRepository) {
        this.avisRepository = avisRepository;
        this.accessoireRepository = accessoireRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public AvisDTO create(AvisDTO dto) {
        Accessoire accessoire = accessoireRepository.findById(dto.getAccessoireId())
                .orElseThrow(() -> new ResourceNotFoundException("Accessoire", "id", dto.getAccessoireId()));

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Utilisateur user = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur", "email", email));

        Avis avis = new Avis();
        avis.setNote(dto.getNote());
        avis.setCommentaire(dto.getCommentaire());
        avis.setNomUtilisateur(user.getPrenom() + " " + user.getNom());
        avis.setAccessoire(accessoire);

        Avis savedAvis = avisRepository.save(avis);
        return mapToDTO(savedAvis);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AvisDTO> getByAccessoireId(Long accessoireId) {
        return avisRepository.findByAccessoireIdOrderByCreatedAtDesc(accessoireId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private AvisDTO mapToDTO(Avis avis) {
        AvisDTO dto = new AvisDTO();
        dto.setId(avis.getId());
        dto.setNote(avis.getNote());
        dto.setCommentaire(avis.getCommentaire());
        dto.setNomUtilisateur(avis.getNomUtilisateur());
        dto.setAccessoireId(avis.getAccessoire().getId());
        dto.setCreatedAt(avis.getCreatedAt());
        return dto;
    }
}
