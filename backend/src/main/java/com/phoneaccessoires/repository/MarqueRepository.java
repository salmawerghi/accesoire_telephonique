package com.phoneaccessoires.repository;

import com.phoneaccessoires.entity.Marque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository JPA pour les marques
 */
@Repository
public interface MarqueRepository extends JpaRepository<Marque, Long> {

    /**
     * Recherche par nom (contient)
     */
    List<Marque> findByNomContainingIgnoreCase(String nom);

    /**
     * Recherche exacte par nom
     */
    Optional<Marque> findByNomIgnoreCase(String nom);

    /**
     * Rechercher par pays d'origine
     */
    List<Marque> findByPaysOrigineIgnoreCase(String paysOrigine);

    /**
     * Vérifier existence par nom
     */
    boolean existsByNomIgnoreCase(String nom);
}
