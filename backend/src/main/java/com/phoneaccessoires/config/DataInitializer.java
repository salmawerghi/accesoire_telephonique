package com.phoneaccessoires.config;

import com.phoneaccessoires.entity.Accessoire;
import com.phoneaccessoires.entity.Categorie;
import com.phoneaccessoires.entity.Marque;
import com.phoneaccessoires.repository.AccessoireRepository;
import com.phoneaccessoires.repository.CategorieRepository;
import com.phoneaccessoires.repository.MarqueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

/**
 * Initialise la base de données avec des données de test
 * Ne s'exécute que si les tables sont vides (sûr pour les redémarrages)
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final CategorieRepository categorieRepository;
    private final MarqueRepository marqueRepository;
    private final AccessoireRepository accessoireRepository;

    public DataInitializer(CategorieRepository categorieRepository,
                           MarqueRepository marqueRepository,
                           AccessoireRepository accessoireRepository) {
        this.categorieRepository = categorieRepository;
        this.marqueRepository = marqueRepository;
        this.accessoireRepository = accessoireRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        // Ne charger les données que si la base est vide
        if (categorieRepository.count() > 0) {
            log.info("Base de données déjà initialisée, skip du chargement des données de test.");
            return;
        }

        log.info("Initialisation de la base de données avec les données de test...");

        // Catégories
        Categorie protections = categorieRepository.save(Categorie.builder()
                .nom("Protections")
                .description("Coques, protections d'écran et étuis")
                .build());

        Categorie charging = categorieRepository.save(Categorie.builder()
                .nom("Accessoires Charging")
                .description("Câbles, chargeurs et batteries")
                .build());

        Categorie audio = categorieRepository.save(Categorie.builder()
                .nom("Audio")
                .description("Écouteurs, haut-parleurs et microphones")
                .build());

        Categorie support = categorieRepository.save(Categorie.builder()
                .nom("Support & Mounting")
                .description("Supports de téléphone et accessoires de montage")
                .build());

        Categorie nettoyage = categorieRepository.save(Categorie.builder()
                .nom("Nettoyage & Maintenance")
                .description("Produits de nettoyage et d'entretien")
                .build());

        log.info("5 catégories créées avec succès.");

        // Marques
        Marque apple = marqueRepository.save(Marque.builder()
                .nom("Apple")
                .paysOrigine("États-Unis")
                .logoUrl("https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg")
                .build());

        Marque samsung = marqueRepository.save(Marque.builder()
                .nom("Samsung")
                .paysOrigine("Corée du Sud")
                .logoUrl("https://upload.wikimedia.org/wikipedia/commons/2/2f/Samsung_Logo.svg")
                .build());

        Marque anker = marqueRepository.save(Marque.builder()
                .nom("Anker")
                .paysOrigine("Chine")
                .logoUrl("https://upload.wikimedia.org/wikipedia/commons/a/a9/Anker_new_logo.png")
                .build());

        Marque belkin = marqueRepository.save(Marque.builder()
                .nom("Belkin")
                .paysOrigine("États-Unis")
                .logoUrl("https://upload.wikimedia.org/wikipedia/commons/3/38/Belkin_logo.svg")
                .build());

        Marque otterbox = marqueRepository.save(Marque.builder()
                .nom("OtterBox")
                .paysOrigine("États-Unis")
                .logoUrl("https://upload.wikimedia.org/wikipedia/commons/5/50/OtterBox_logo.svg")
                .build());

        log.info("5 marques créées avec succès.");

        // Accessoires
        List<Accessoire> accessoires = List.of(
                Accessoire.builder()
                        .nom("Coque Apple iPhone 15 Pro")
                        .description("Coque officielle en silicone pour iPhone 15 Pro")
                        .prix(new BigDecimal("49.99"))
                        .stock(25)
                        .imageUrl("https://via.placeholder.com/300x300?text=Apple+Case")
                        .reference("APPLE-IP15-001")
                        .categorie(protections)
                        .marque(apple)
                        .build(),

                Accessoire.builder()
                        .nom("Protection écran verre trempé Samsung Galaxy S24")
                        .description("Protecteur d'écran en verre trempé 9H")
                        .prix(new BigDecimal("12.99"))
                        .stock(50)
                        .imageUrl("https://via.placeholder.com/300x300?text=Glass+Protector")
                        .reference("SAMSUNG-S24-GLASS")
                        .categorie(protections)
                        .marque(samsung)
                        .build(),

                Accessoire.builder()
                        .nom("Étui en cuir Belkin pour iPhone 15")
                        .description("Étui en cuir premium avec porte-cartes")
                        .prix(new BigDecimal("79.99"))
                        .stock(15)
                        .imageUrl("https://via.placeholder.com/300x300?text=Leather+Case")
                        .reference("BELKIN-IP15-LEATHER")
                        .categorie(protections)
                        .marque(belkin)
                        .build(),

                Accessoire.builder()
                        .nom("Câble Lightning 2m Apple")
                        .description("Câble de charge officiel Apple Lightning (2 mètres)")
                        .prix(new BigDecimal("19.99"))
                        .stock(40)
                        .imageUrl("https://via.placeholder.com/300x300?text=Lightning+Cable")
                        .reference("APPLE-LIGHTNING-2M")
                        .categorie(charging)
                        .marque(apple)
                        .build(),

                Accessoire.builder()
                        .nom("Chargeur rapide USB-C 65W Anker")
                        .description("Chargeur rapide multi-port avec technologie PowerIQ 3.0")
                        .prix(new BigDecimal("34.99"))
                        .stock(30)
                        .imageUrl("https://via.placeholder.com/300x300?text=USB-C+Charger")
                        .reference("ANKER-USB-65W")
                        .categorie(charging)
                        .marque(anker)
                        .build(),

                Accessoire.builder()
                        .nom("Power Bank 20000mAh Anker")
                        .description("Batterie externe 20000mAh avec charge rapide")
                        .prix(new BigDecimal("29.99"))
                        .stock(45)
                        .imageUrl("https://via.placeholder.com/300x300?text=Power+Bank")
                        .reference("ANKER-POWERBANK-20K")
                        .categorie(charging)
                        .marque(anker)
                        .build(),

                Accessoire.builder()
                        .nom("AirPods Pro Apple")
                        .description("Écouteurs sans fil avec réduction active du bruit")
                        .prix(new BigDecimal("249.99"))
                        .stock(20)
                        .imageUrl("https://via.placeholder.com/300x300?text=AirPods+Pro")
                        .reference("APPLE-AIRPODS-PRO")
                        .categorie(audio)
                        .marque(apple)
                        .build(),

                Accessoire.builder()
                        .nom("Haut-parleur Bluetooth Anker Soundcore")
                        .description("Haut-parleur portable avec son 360 degrés")
                        .prix(new BigDecimal("49.99"))
                        .stock(25)
                        .imageUrl("https://via.placeholder.com/300x300?text=Bluetooth+Speaker")
                        .reference("ANKER-SOUNDCORE")
                        .categorie(audio)
                        .marque(anker)
                        .build(),

                Accessoire.builder()
                        .nom("Support de voiture magnétique Anker")
                        .description("Support magnétique pour tableau de bord")
                        .prix(new BigDecimal("12.99"))
                        .stock(60)
                        .imageUrl("https://via.placeholder.com/300x300?text=Car+Mount")
                        .reference("ANKER-CAR-MOUNT")
                        .categorie(support)
                        .marque(anker)
                        .build(),

                Accessoire.builder()
                        .nom("Kit de nettoyage pour téléphone")
                        .description("Ensemble complet de nettoyage : spray, lingettes, brosse")
                        .prix(new BigDecimal("15.99"))
                        .stock(35)
                        .imageUrl("https://via.placeholder.com/300x300?text=Cleaning+Kit")
                        .reference("CLEANING-KIT-001")
                        .categorie(nettoyage)
                        .marque(belkin)
                        .build()
        );

        accessoireRepository.saveAll(accessoires);
        log.info("10 accessoires créés avec succès.");
        log.info("=== Initialisation de la base de données terminée ===");
    }
}
