package com.phoneaccessoires.repository;

import com.phoneaccessoires.entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository JPA pour les catégories
 */
@Repository
public interface CategorieRepository extends JpaRepository<Categorie, Long> {

    /**
     * Recherche par nom (contient)
     */
    List<Categorie> findByNomContainingIgnoreCase(String nom);

    /**
     * Vérifier si une catégorie avec ce nom existe déjà
     */
    Optional<Categorie> findByNomIgnoreCase(String nom);

    /**
     * Vérifier si une catégorie existe par nom
     */
    boolean existsByNomIgnoreCase(String nom);
}
