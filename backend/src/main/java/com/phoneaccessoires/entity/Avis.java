package com.phoneaccessoires.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "avis")
public class Avis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer note;

    @Column(columnDefinition = "TEXT")
    private String commentaire;

    @Column(name = "nom_utilisateur", nullable = false)
    private String nomUtilisateur;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accessoire_id", nullable = false)
    @JsonIgnore
    private Accessoire accessoire;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Avis() {}

    public Avis(Long id, Integer note, String commentaire, String nomUtilisateur, Accessoire accessoire, LocalDateTime createdAt) {
        this.id = id;
        this.note = note;
        this.commentaire = commentaire;
        this.nomUtilisateur = nomUtilisateur;
        this.accessoire = accessoire;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Integer getNote() { return note; }
    public void setNote(Integer note) { this.note = note; }
    public String getCommentaire() { return commentaire; }
    public void setCommentaire(String commentaire) { this.commentaire = commentaire; }
    public String getNomUtilisateur() { return nomUtilisateur; }
    public void setNomUtilisateur(String nomUtilisateur) { this.nomUtilisateur = nomUtilisateur; }
    public Accessoire getAccessoire() { return accessoire; }
    public void setAccessoire(Accessoire accessoire) { this.accessoire = accessoire; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
