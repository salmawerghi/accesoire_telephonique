package com.phoneaccessoires.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "accessoire_images")
public class AccessoireImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accessoire_id", nullable = false)
    private Accessoire accessoire;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public AccessoireImage() {}

    public AccessoireImage(String imageUrl, Accessoire accessoire) {
        this.imageUrl = imageUrl;
        this.accessoire = accessoire;
    }

    public Long getId() { return id; }
    public String getImageUrl() { return imageUrl; }
    public Accessoire getAccessoire() { return accessoire; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setAccessoire(Accessoire accessoire) { this.accessoire = accessoire; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
