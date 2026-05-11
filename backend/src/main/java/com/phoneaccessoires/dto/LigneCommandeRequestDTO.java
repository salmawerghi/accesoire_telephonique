package com.phoneaccessoires.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class LigneCommandeRequestDTO {

    @NotNull(message = "L'ID de l'accessoire est obligatoire")
    private Long accessoireId;

    @NotNull(message = "La quantité est obligatoire")
    @Min(value = 1, message = "La quantité doit être au moins 1")
    private Integer quantite;

    public LigneCommandeRequestDTO() {}

    public Long getAccessoireId() { return accessoireId; }
    public void setAccessoireId(Long accessoireId) { this.accessoireId = accessoireId; }

    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }
}
