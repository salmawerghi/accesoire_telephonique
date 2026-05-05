package com.phoneaccessoires.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Entité représentant une marque d'accessoires téléphoniques
 */
@Entity
@Table(name = "marques")
public class Marque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom", nullable = false, length = 100)
    private String nom;

    @Column(name = "pays_origine", length = 100)
    private String paysOrigine;

    @Column(name = "logo_url", length = 255)
    private String logoUrl;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "marque", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Accessoire> accessoires;

    public Marque() {}

    public Marque(Long id, String nom, String paysOrigine, String logoUrl, LocalDateTime createdAt, List<Accessoire> accessoires) {
        this.id = id;
        this.nom = nom;
        this.paysOrigine = paysOrigine;
        this.logoUrl = logoUrl;
        this.createdAt = createdAt;
        this.accessoires = accessoires;
    }

    // Getters
    public Long getId() { return id; }
    public String getNom() { return nom; }
    public String getPaysOrigine() { return paysOrigine; }
    public String getLogoUrl() { return logoUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<Accessoire> getAccessoires() { return accessoires; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setPaysOrigine(String paysOrigine) { this.paysOrigine = paysOrigine; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setAccessoires(List<Accessoire> accessoires) { this.accessoires = accessoires; }

    // Builder
    public static MarqueBuilder builder() { return new MarqueBuilder(); }

    public static class MarqueBuilder {
        private Long id;
        private String nom;
        private String paysOrigine;
        private String logoUrl;
        private LocalDateTime createdAt;
        private List<Accessoire> accessoires;

        public MarqueBuilder id(Long id) { this.id = id; return this; }
        public MarqueBuilder nom(String nom) { this.nom = nom; return this; }
        public MarqueBuilder paysOrigine(String paysOrigine) { this.paysOrigine = paysOrigine; return this; }
        public MarqueBuilder logoUrl(String logoUrl) { this.logoUrl = logoUrl; return this; }
        public MarqueBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public MarqueBuilder accessoires(List<Accessoire> accessoires) { this.accessoires = accessoires; return this; }

        public Marque build() {
            return new Marque(id, nom, paysOrigine, logoUrl, createdAt, accessoires);
        }
    }
}
