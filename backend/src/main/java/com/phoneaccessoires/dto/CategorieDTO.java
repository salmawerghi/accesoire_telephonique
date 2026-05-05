package com.phoneaccessoires.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO pour la création/modification d'une catégorie
 */
public class CategorieDTO {

    @NotBlank(message = "Le nom de la catégorie est obligatoire")
    @Size(max = 100, message = "Le nom ne doit pas dépasser 100 caractères")
    private String nom;

    private String description;

    public CategorieDTO() {}

    public CategorieDTO(String nom, String description) {
        this.nom = nom;
        this.description = description;
    }

    // Getters
    public String getNom() { return nom; }
    public String getDescription() { return description; }

    // Setters
    public void setNom(String nom) { this.nom = nom; }
    public void setDescription(String description) { this.description = description; }
}
