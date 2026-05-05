package com.phoneaccessoires.repository;

import com.phoneaccessoires.entity.Accessoire;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Repository JPA pour les accessoires
 */
@Repository
public interface AccessoireRepository extends JpaRepository<Accessoire, Long> {

    Page<Accessoire> findByNomContainingIgnoreCase(String nom, Pageable pageable);

    List<Accessoire> findByNomContainingIgnoreCase(String nom);

    Page<Accessoire> findByCategorieId(Long categorieId, Pageable pageable);

    Page<Accessoire> findByMarqueId(Long marqueId, Pageable pageable);

    Optional<Accessoire> findByReference(String reference);

    boolean existsByReference(String reference);

    boolean existsByReferenceAndIdNot(String reference, Long id);

    long countByCategorieId(Long categorieId);

    long countByMarqueId(Long marqueId);

    @Query("SELECT a FROM Accessoire a " +
           "LEFT JOIN FETCH a.categorie c " +
           "LEFT JOIN FETCH a.marque m " +
           "WHERE (:nom IS NULL OR LOWER(a.nom) LIKE LOWER(CONCAT('%', CAST(:nom AS string), '%'))) " +
           "AND (:categorieId IS NULL OR c.id = :categorieId) " +
           "AND (:marqueId IS NULL OR m.id = :marqueId) " +
           "AND (:enPromotion IS NULL OR a.enPromotion = :enPromotion) " +
           "AND (:prixMin IS NULL OR a.prix >= :prixMin) " +
           "AND (:prixMax IS NULL OR a.prix <= :prixMax)")
    Page<Accessoire> searchAdvanced(
            @Param("nom") String nom,
            @Param("categorieId") Long categorieId,
            @Param("marqueId") Long marqueId,
            @Param("enPromotion") Boolean enPromotion,
            @Param("prixMin") BigDecimal prixMin,
            @Param("prixMax") BigDecimal prixMax,
            Pageable pageable);
}
