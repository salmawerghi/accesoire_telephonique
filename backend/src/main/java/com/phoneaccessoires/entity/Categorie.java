package com.phoneaccessoires.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Entité représentant une catégorie d'accessoires téléphoniques
 */
@Entity
@Table(name = "categories")
public class Categorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom", nullable = false, length = 100)
    private String nom;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "categorie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Accessoire> accessoires;

    public Categorie() {}

    public Categorie(Long id, String nom, String description, LocalDateTime createdAt, List<Accessoire> accessoires) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.createdAt = createdAt;
        this.accessoires = accessoires;
    }

    // Getters
    public Long getId() { return id; }
    public String getNom() { return nom; }
    public String getDescription() { return description; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<Accessoire> getAccessoires() { return accessoires; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setDescription(String description) { this.description = description; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setAccessoires(List<Accessoire> accessoires) { this.accessoires = accessoires; }

    // Builder
    public static CategorieBuilder builder() { return new CategorieBuilder(); }

    public static class CategorieBuilder {
        private Long id;
        private String nom;
        private String description;
        private LocalDateTime createdAt;
        private List<Accessoire> accessoires;

        public CategorieBuilder id(Long id) { this.id = id; return this; }
        public CategorieBuilder nom(String nom) { this.nom = nom; return this; }
        public CategorieBuilder description(String description) { this.description = description; return this; }
        public CategorieBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public CategorieBuilder accessoires(List<Accessoire> accessoires) { this.accessoires = accessoires; return this; }

        public Categorie build() {
            return new Categorie(id, nom, description, createdAt, accessoires);
        }
    }
}
