package com.phoneaccessoires.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO pour la création/modification d'une marque
 */
public class MarqueDTO {

    @NotBlank(message = "Le nom de la marque est obligatoire")
    @Size(max = 100, message = "Le nom ne doit pas dépasser 100 caractères")
    private String nom;

    @Size(max = 100, message = "Le pays d'origine ne doit pas dépasser 100 caractères")
    private String paysOrigine;

    @Size(max = 255, message = "L'URL du logo ne doit pas dépasser 255 caractères")
    private String logoUrl;

    public MarqueDTO() {}

    public MarqueDTO(String nom, String paysOrigine, String logoUrl) {
        this.nom = nom;
        this.paysOrigine = paysOrigine;
        this.logoUrl = logoUrl;
    }

    // Getters
    public String getNom() { return nom; }
    public String getPaysOrigine() { return paysOrigine; }
    public String getLogoUrl() { return logoUrl; }

    // Setters
    public void setNom(String nom) { this.nom = nom; }
    public void setPaysOrigine(String paysOrigine) { this.paysOrigine = paysOrigine; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
}
