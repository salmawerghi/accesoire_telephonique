package com.phoneaccessoires.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

/**
 * DTO pour la création/modification d'un accessoire
 */
public class AccessoireDTO {

    @NotBlank(message = "Le nom de l'accessoire est obligatoire")
    @Size(max = 200, message = "Le nom ne doit pas dépasser 200 caractères")
    private String nom;

    private String description;

    @NotNull(message = "Le prix est obligatoire")
    @DecimalMin(value = "0.0", inclusive = false, message = "Le prix doit être supérieur à 0")
    private BigDecimal prix;

    private BigDecimal prixAncien;

    @Min(value = 0, message = "Le stock ne peut pas être négatif")
    private Integer stock;

    private Boolean enPromotion = false;

    @Size(max = 50, message = "La garantie ne doit pas dépasser 50 caractères")
    private String garantie;

    private String caracteristiques;

    @Size(max = 500, message = "L'URL de l'image ne doit pas dépasser 500 caractères")
    private String imageUrl;

    private List<String> imagesGallery; // Liste d'URLs pour la galerie

    @Size(max = 100, message = "La référence ne doit pas dépasser 100 caractères")
    private String reference;

    private Long categorieId;

    private Long marqueId;

    public AccessoireDTO() {}

    // Getters et Setters
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getPrix() { return prix; }
    public void setPrix(BigDecimal prix) { this.prix = prix; }
    public BigDecimal getPrixAncien() { return prixAncien; }
    public void setPrixAncien(BigDecimal prixAncien) { this.prixAncien = prixAncien; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    public Boolean getEnPromotion() { return enPromotion; }
    public void setEnPromotion(Boolean enPromotion) { this.enPromotion = enPromotion; }
    public String getGarantie() { return garantie; }
    public void setGarantie(String garantie) { this.garantie = garantie; }
    public String getCaracteristiques() { return caracteristiques; }
    public void setCaracteristiques(String caracteristiques) { this.caracteristiques = caracteristiques; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public List<String> getImagesGallery() { return imagesGallery; }
    public void setImagesGallery(List<String> imagesGallery) { this.imagesGallery = imagesGallery; }
    public String getReference() { return reference; }
    public void setReference(String reference) { this.reference = reference; }
    public Long getCategorieId() { return categorieId; }
    public void setCategorieId(Long categorieId) { this.categorieId = categorieId; }
    public Long getMarqueId() { return marqueId; }
    public void setMarqueId(Long marqueId) { this.marqueId = marqueId; }
}
