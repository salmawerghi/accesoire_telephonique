package com.phoneaccessoires.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO de réponse pour un accessoire (inclut les détails de catégorie et marque)
 */
public class AccessoireResponseDTO {

    private Long id;
    private String nom;
    private String description;
    private BigDecimal prix;
    private BigDecimal prixAncien;
    private Integer stock;
    private Boolean enPromotion;
    private String garantie;
    private String caracteristiques;
    private String imageUrl;
    private List<String> imagesGallery;
    private String reference;

    // Informations catégorie
    private Long categorieId;
    private String categorieNom;

    // Informations marque
    private Long marqueId;
    private String marqueNom;
    private String marqueLogoUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public AccessoireResponseDTO() {}

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public String getCategorieNom() { return categorieNom; }
    public void setCategorieNom(String categorieNom) { this.categorieNom = categorieNom; }
    public Long getMarqueId() { return marqueId; }
    public void setMarqueId(Long marqueId) { this.marqueId = marqueId; }
    public String getMarqueNom() { return marqueNom; }
    public void setMarqueNom(String marqueNom) { this.marqueNom = marqueNom; }
    public String getMarqueLogoUrl() { return marqueLogoUrl; }
    public void setMarqueLogoUrl(String marqueLogoUrl) { this.marqueLogoUrl = marqueLogoUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
