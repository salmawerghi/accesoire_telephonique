package com.phoneaccessoires.dto;

import java.math.BigDecimal;

public class LigneCommandeResponseDTO {
    private Long id;
    private Long accessoireId;
    private String accessoireNom;
    private Integer quantite;
    private BigDecimal prixUnitaire;

    public LigneCommandeResponseDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getAccessoireId() { return accessoireId; }
    public void setAccessoireId(Long accessoireId) { this.accessoireId = accessoireId; }

    public String getAccessoireNom() { return accessoireNom; }
    public void setAccessoireNom(String accessoireNom) { this.accessoireNom = accessoireNom; }

    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }

    public BigDecimal getPrixUnitaire() { return prixUnitaire; }
    public void setPrixUnitaire(BigDecimal prixUnitaire) { this.prixUnitaire = prixUnitaire; }
}
