# 📱 TechStore - Gestion d'Accessoires Téléphoniques

Application Full-Stack (Spring Boot + Next.js) pour la gestion d'inventaire d'accessoires de téléphones.

## 🏗️ Architecture

```text
/
├── backend/                  # Application Spring Boot (API REST)
│   ├── src/main/java         # Code source Java (Controllers, Services, Repositories, Entities, DTOs)
│   └── src/main/resources    # Configuration (application.properties, data.sql)
│
├── frontend/                 # Application Next.js 14
│   ├── app/                  # App Router (Pages, Layout, Globals CSS)
│   ├── components/           # Composants UI (Navbar, etc.)
│   └── lib/api/              # Services d'appels API (Axios)
│
├── start.bat                 # Script de lancement Windows
└── start.ps1                 # Script de lancement PowerShell
```

## 📋 Prérequis

- Java 17+
- Node.js 18+
- PostgreSQL 15+
- Maven

## 🚀 Démarrage Rapide

La méthode la plus simple pour lancer l'application est d'utiliser le script fourni (Assurez-vous que PostgreSQL est allumé en tâche de fond) :

```cmd
.\start.bat
```
*(ou `.\start.ps1` en PowerShell)*

Ce script va automatiquement compiler le backend, le lancer sur le port `8080`, puis démarrer le frontend Next.js sur le port `3000`.

### Lancement Manuel

**Backend :**
1. Créer une base de données PostgreSQL nommée `phone_accessories_db`.
2. Lancer `cd backend`
3. Lancer `mvn spring-boot:run`
*(L'application va auto-créer les tables et insérer les données de `data.sql`)*

**Frontend :**
1. Lancer `cd frontend`
2. Lancer `npm run dev`

## 📊 Schéma de la Base de Données

- **categories** : `id` (PK), `nom`, `description`, `created_at`
- **marques** : `id` (PK), `nom`, `pays_origine`, `logo_url`, `created_at`
- **accessoires** : `id` (PK), `nom`, `description`, `prix`, `stock`, `image_url`, `reference`, `categorie_id` (FK), `marque_id` (FK), `created_at`, `updated_at`

## 🌐 Endpoints API

| Méthode | URL | Description | Body |
|---------|-----|-------------|------|
| **GET** | `/api/accessoires` | Liste les accessoires (paginé) | *Aucun* |
| **GET** | `/api/accessoires/{id}` | Un accessoire spécifique | *Aucun* |
| **POST** | `/api/accessoires` | Créer un accessoire | `AccessoireDTO` |
| **PUT** | `/api/accessoires/{id}` | Modifier un accessoire | `AccessoireDTO` |
| **DELETE**| `/api/accessoires/{id}` | Supprimer un accessoire | *Aucun* |
| **GET** | `/api/accessoires/search?nom=X`| Recherche par nom | *Aucun* |
| **GET** | `/api/categories` | Liste les catégories | *Aucun* |
| **POST**| `/api/categories` | Créer une catégorie | `CategorieDTO` |
| **GET** | `/api/marques` | Liste les marques | *Aucun* |
| **POST**| `/api/marques` | Créer une marque | `MarqueDTO` |

## ⚙️ Variables d'Environnement (Backend)

`backend/src/main/resources/application.properties` :
- `spring.datasource.url=jdbc:postgresql://localhost:5432/phone_accessories_db`
- `spring.datasource.username=postgres`
- `spring.datasource.password=password`
- `server.port=8080`
