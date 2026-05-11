package com.phoneaccessoires.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class CommandeResponseDTO {
    private Long id;
    private String prenom;
    private String nom;
    private String adresse;
    private String ville;
    private String telephone;
    private String methodPaiement;
    private BigDecimal total;
    private LocalDateTime createdAt;
    private List<LigneCommandeResponseDTO> lignes;

    public CommandeResponseDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getMethodPaiement() { return methodPaiement; }
    public void setMethodPaiement(String methodPaiement) { this.methodPaiement = methodPaiement; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<LigneCommandeResponseDTO> getLignes() { return lignes; }
    public void setLignes(List<LigneCommandeResponseDTO> lignes) { this.lignes = lignes; }
}
