package com.phoneaccessoires.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entité représentant un accessoire téléphonique
 */
@Entity
@Table(name = "accessoires")
public class Accessoire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom", nullable = false, length = 200)
    private String nom;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "prix", nullable = false, precision = 10, scale = 2)
    private BigDecimal prix;

    @Column(name = "prix_ancien", precision = 10, scale = 2)
    private BigDecimal prixAncien;

    @Column(name = "stock", columnDefinition = "INTEGER DEFAULT 0")
    private Integer stock;

    @Column(name = "en_promotion")
    private Boolean enPromotion = false;

    @Column(name = "garantie", length = 50)
    private String garantie;

    @Column(name = "caracteristiques", columnDefinition = "TEXT")
    private String caracteristiques;

    @Column(name = "image_url", length = 500)
    private String imageUrl; // Image principale

    @OneToMany(mappedBy = "accessoire", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AccessoireImage> images = new ArrayList<>(); // Galerie d'images

    @Column(name = "reference", length = 100, unique = true)
    private String reference;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categorie_id")
    private Categorie categorie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "marque_id")
    private Marque marque;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Accessoire() {}

    public Accessoire(Long id, String nom, String description, BigDecimal prix, BigDecimal prixAncien, Integer stock,
                      Boolean enPromotion, String garantie, String caracteristiques, String imageUrl, String reference, 
                      Categorie categorie, Marque marque, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.prixAncien = prixAncien;
        this.stock = stock;
        this.enPromotion = enPromotion;
        this.garantie = garantie;
        this.caracteristiques = caracteristiques;
        this.imageUrl = imageUrl;
        this.reference = reference;
        this.categorie = categorie;
        this.marque = marque;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters
    public Long getId() { return id; }
    public String getNom() { return nom; }
    public String getDescription() { return description; }
    public BigDecimal getPrix() { return prix; }
    public BigDecimal getPrixAncien() { return prixAncien; }
    public Integer getStock() { return stock; }
    public Boolean getEnPromotion() { return enPromotion; }
    public String getGarantie() { return garantie; }
    public String getCaracteristiques() { return caracteristiques; }
    public String getImageUrl() { return imageUrl; }
    public List<AccessoireImage> getImages() { return images; }
    public String getReference() { return reference; }
    public Categorie getCategorie() { return categorie; }
    public Marque getMarque() { return marque; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setDescription(String description) { this.description = description; }
    public void setPrix(BigDecimal prix) { this.prix = prix; }
    public void setPrixAncien(BigDecimal prixAncien) { this.prixAncien = prixAncien; }
    public void setStock(Integer stock) { this.stock = stock; }
    public void setEnPromotion(Boolean enPromotion) { this.enPromotion = enPromotion; }
    public void setGarantie(String garantie) { this.garantie = garantie; }
    public void setCaracteristiques(String caracteristiques) { this.caracteristiques = caracteristiques; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setImages(List<AccessoireImage> images) { this.images = images; }
    public void setReference(String reference) { this.reference = reference; }
    public void setCategorie(Categorie categorie) { this.categorie = categorie; }
    public void setMarque(Marque marque) { this.marque = marque; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Builder pattern
    public static AccessoireBuilder builder() { return new AccessoireBuilder(); }

    public static class AccessoireBuilder {
        private Long id;
        private String nom;
        private String description;
        private BigDecimal prix;
        private BigDecimal prixAncien;
        private Integer stock;
        private Boolean enPromotion = false;
        private String garantie;
        private String caracteristiques;
        private String imageUrl;
        private String reference;
        private Categorie categorie;
        private Marque marque;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public AccessoireBuilder id(Long id) { this.id = id; return this; }
        public AccessoireBuilder nom(String nom) { this.nom = nom; return this; }
        public AccessoireBuilder description(String description) { this.description = description; return this; }
        public AccessoireBuilder prix(BigDecimal prix) { this.prix = prix; return this; }
        public AccessoireBuilder prixAncien(BigDecimal prixAncien) { this.prixAncien = prixAncien; return this; }
        public AccessoireBuilder stock(Integer stock) { this.stock = stock; return this; }
        public AccessoireBuilder enPromotion(Boolean enPromotion) { this.enPromotion = enPromotion; return this; }
        public AccessoireBuilder garantie(String garantie) { this.garantie = garantie; return this; }
        public AccessoireBuilder caracteristiques(String caracteristiques) { this.caracteristiques = caracteristiques; return this; }
        public AccessoireBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public AccessoireBuilder reference(String reference) { this.reference = reference; return this; }
        public AccessoireBuilder categorie(Categorie categorie) { this.categorie = categorie; return this; }
        public AccessoireBuilder marque(Marque marque) { this.marque = marque; return this; }
        public AccessoireBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public AccessoireBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Accessoire build() {
            return new Accessoire(id, nom, description, prix, prixAncien, stock, enPromotion, garantie, caracteristiques, imageUrl, reference, categorie, marque, createdAt, updatedAt);
        }
    }
}
