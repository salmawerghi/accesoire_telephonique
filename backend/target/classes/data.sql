-- ===========================
-- Données de test - Catégories
-- ===========================
INSERT INTO categories (id, nom, description, created_at) VALUES 
(1, 'Protections', 'Coques, protections d''écran et étuis', NOW()),
(2, 'Charge & Câbles', 'Câbles, chargeurs, adaptateurs et Powerbanks', NOW()),
(3, 'Audio', 'Écouteurs TWS, casques sans fil et haut-parleurs', NOW()),
(4, 'Support & Voiture', 'Supports auto, ring lights et trépieds', NOW()),
(5, 'Smartwatches', 'Montres connectées et bracelets intelligents', NOW());

-- ===========================
-- Données de test - Marques
-- ===========================
INSERT INTO marques (id, nom, pays_origine, logo_url, created_at) VALUES 
(1, 'Apple', 'États-Unis', 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', NOW()),
(2, 'Samsung', 'Corée du Sud', 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Samsung_Logo.svg', NOW()),
(3, 'Xiaomi', 'Chine', 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg', NOW()),
(4, 'Oraimo', 'Chine', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Oraimo_Logo.png/800px-Oraimo_Logo.png', NOW()),
(5, 'JBL', 'États-Unis', 'https://upload.wikimedia.org/wikipedia/commons/1/1c/JBL_logo.svg', NOW()),
(6, 'Inkax', 'Chine', 'https://via.placeholder.com/150x50?text=Inkax', NOW()),
(7, 'Realme', 'Chine', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Realme_logo.png/800px-Realme_logo.png', NOW());

-- ===========================
-- Données de test - Accessoires
-- ===========================
-- Pour s'assurer que les IDs correspondent, on insère avec les colonnes spécifiques
INSERT INTO accessoires (id, nom, description, prix, prix_ancien, stock, en_promotion, garantie, caracteristiques, image_url, reference, categorie_id, marque_id, created_at, updated_at) VALUES 

-- Audio (categorie_id = 3)
(1, 'Écouteurs Sans Fil Oraimo FreePods 4', 'Écouteurs TWS avec annulation de bruit active (ANC) et une grande autonomie.', 119.00, 149.00, 120, true, '1 an', '{"Bluetooth": "5.2", "Autonomie": "35h avec boitier", "ANC": "Oui", "Couleur": "Noir"}', 'https://tn.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/51/791001/1.jpg', 'ORA-FP4-001', 3, 4, NOW(), NOW()),
(2, 'Écouteurs Sans Fil Apple AirPods Pro 2', 'Les AirPods Pro offrent une Réduction active du bruit jusqu’à 2x plus performante.', 899.00, 950.00, 15, true, '1 an', '{"Bluetooth": "5.3", "Autonomie": "30h avec boitier", "ANC": "Oui", "Puce": "H2"}', 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83_AV1?wid=1144&hei=1144&fmt=jpeg', 'APP-AP2-002', 3, 1, NOW(), NOW()),
(3, 'Casque Bluetooth JBL Tune 510BT', 'Le casque JBL Tune 510BT vous permet de diffuser un son puissant JBL Pure Bass.', 179.00, null, 40, false, '1 an', '{"Bluetooth": "5.0", "Autonomie": "40h", "Micro": "Intégré", "Couleur": "Bleu"}', 'https://www.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw1be9f2a0/JBL_TUNE_510BT_Product%20Image_Hero_Blue.png', 'JBL-T510-BL', 3, 5, NOW(), NOW()),
(4, 'Écouteurs Sans Fil Xiaomi Redmi Buds 4 Active', 'Des basses profondes et des aigus clairs pour votre musique.', 79.00, 99.00, 200, true, '6 mois', '{"Bluetooth": "5.3", "Autonomie": "28h", "Charge Rapide": "Oui"}', 'https://i0.wp.com/www.mytek.tn/media/catalog/product/cache/8d96ba096e51af5832a26534e7cb80dc/e/c/ecouteurs-sans-fil-redmi-buds-4-active-noir-1.jpg', 'XIA-RB4A-B', 3, 3, NOW(), NOW()),

-- Charge & Câbles (categorie_id = 2)
(5, 'Powerbank Oraimo 20000mAh', 'Batterie externe haute capacité avec charge rapide 20W.', 85.00, 110.00, 50, true, '1 an', '{"Capacité": "20000 mAh", "Ports": "2x USB-A, 1x Type-C", "Puissance": "20W"}', 'https://tn.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/84/027813/1.jpg', 'ORA-PB20K', 2, 4, NOW(), NOW()),
(6, 'Chargeur Rapide Samsung 25W Original', 'Adaptateur secteur USB-C 25W pour une charge ultra rapide.', 65.00, null, 150, false, '6 mois', '{"Puissance": "25W", "Port": "Type-C", "Couleur": "Noir"}', 'https://images.samsung.com/is/image/samsung/p6pim/tn/ep-t2510nbegea/gallery/tn-25w-power-adapter-ep-t2510-482276-ep-t2510nbegea-538600870', 'SAM-CH25W-N', 2, 2, NOW(), NOW()),
(7, 'Câble Inkax Type-C vers Type-C 65W', 'Câble tressé ultra résistant de 1 mètre.', 15.00, null, 300, false, 'Sans', '{"Longueur": "1m", "Connecteurs": "Type-C", "Matière": "Tressé"}', 'https://www.cdiscount.com/pdt2/5/7/0/1/700x700/ink6973305575570/rw/cable-inkax-type-c-vers-type-c-1m-pd-60w.jpg', 'INK-CTC-1M', 2, 6, NOW(), NOW()),

-- Smartwatches (categorie_id = 5)
(8, 'Montre Connectée Xiaomi Redmi Watch 3 Active', 'Écran LCD de 1.83", appels Bluetooth, surveillance de la santé.', 149.00, 189.00, 60, true, '1 an', '{"Ecran": "1.83 pouces LCD", "Autonomie": "12 jours", "Appels": "Bluetooth"}', 'https://i0.wp.com/www.mytek.tn/media/catalog/product/cache/8d96ba096e51af5832a26534e7cb80dc/m/o/montre-connectee-xiaomi-redmi-watch-3-active-noir.jpg', 'XIA-RW3A-N', 5, 3, NOW(), NOW()),
(9, 'Apple Watch Series 9 GPS 45mm', 'La montre ultime pour votre vie saine.', 1699.00, 1850.00, 10, true, '1 an', '{"Ecran": "Retina OLED LTPO", "Puce": "S9 SiP", "Résistance": "Eau 50m"}', 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-s9-alum-midnight-nc-45_VW_34FR+watch-face-45-s9-alum-midnight-nc_VW_34FR', 'APP-AW9-45M', 5, 1, NOW(), NOW()),
(10, 'Montre Connectée Realme Watch 3', 'Appels Bluetooth clairs, grand écran, design élégant.', 219.00, null, 25, false, '1 an', '{"Ecran": "1.8 pouces", "Autonomie": "7 jours", "Appels": "Oui"}', 'https://image01.realme.net/general/20220713/1657685655709.png', 'RLM-W3-BLK', 5, 7, NOW(), NOW()),

-- Protections (categorie_id = 1)
(11, 'Coque Transparente Samsung Galaxy S24 Ultra', 'Coque en silicone transparente de haute qualité.', 25.00, null, 80, false, 'Sans', '{"Matière": "Silicone TPU", "Compatibilité": "S24 Ultra"}', 'https://images.samsung.com/is/image/samsung/p6pim/tn/ef-qs928ctegww/gallery/tn-clear-case-ef-qs928-490333-ef-qs928ctegww-539304313', 'SAM-S24U-COQ', 1, 2, NOW(), NOW()),
(12, 'Verre Trempé Inkax iPhone 15', 'Protection d''écran 9H, anti-rayures et oléophobique.', 12.00, 15.00, 150, true, 'Sans', '{"Dureté": "9H", "Compatibilité": "iPhone 15"}', 'https://www.inkax.com.cn/upload/image/202310/14/20231014092404_5682.jpg', 'INK-IP15-VER', 1, 6, NOW(), NOW()),

-- Support & Voiture (categorie_id = 4)
(13, 'Support Voiture Magnétique Baseus', 'Fixation grille d''aération, aimants puissants N52.', 35.00, null, 40, false, '3 mois', '{"Fixation": "Grille", "Rotation": "360 degrés"}', 'https://baseus.tn/wp-content/uploads/2021/04/support-voiture-magnetique-baseus-noir.jpg', 'BAS-SUP-MAG', 4, 3, NOW(), NOW());

-- ===========================
-- Données de test - Images Galerie (accessoire_images)
-- ===========================
INSERT INTO accessoire_images (image_url, accessoire_id, created_at) VALUES 
('https://tn.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/51/791001/2.jpg', 1, NOW()),
('https://tn.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/51/791001/3.jpg', 1, NOW()),
('https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83_AV2?wid=1144&hei=1144&fmt=jpeg', 2, NOW()),
('https://images.samsung.com/is/image/samsung/p6pim/tn/ep-t2510nbegea/gallery/tn-25w-power-adapter-ep-t2510-482276-ep-t2510nbegea-538600871', 6, NOW());
