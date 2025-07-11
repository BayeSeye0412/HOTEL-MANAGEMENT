# Système de Gestion d'Hôtel - Application Complète

Ce projet comprend un système de gestion d'hôtel complet avec un frontend Next.js moderne et un backend Node.js/Express robuste.

## 🚀 Fonctionnalités

### 🔐 Authentification
- **Connexion** - Interface moderne avec validation
- **Inscription** - Création de compte avec validation
- **Mot de passe oublié** - Système de réinitialisation par email
- **Protection des routes** - AuthGuard pour sécuriser l'accès

### 🏨 Interface Admin
- **Dashboard** - Statistiques et aperçu général
- **Gestion des hôtels** - CRUD complet avec interface moderne
- **Sidebar** - Navigation intuitive avec statut utilisateur
- **Navbar** - Notifications, profil et déconnexion

### 📊 Dashboard Admin
- **Statistiques en temps réel** - Hôtels, réservations, revenus, taux d'occupation
- **Graphiques** - Évolution des réservations et répartition par devise
- **Activité récente** - Historique des actions
- **Actions rapides** - Accès direct aux fonctions principales

### 🏨 Gestion des Hôtels
- **Liste des hôtels** - Affichage en cartes avec informations complètes
- **Création d'hôtel** - Formulaire complet avec validation
- **Modification** - Édition des informations d'hôtel
- **Suppression** - Soft delete avec confirmation
- **Upload d'images** - Gestion des photos d'hôtels

## 🛠️ Installation et configuration

### Prérequis
- Node.js (v16 ou supérieur)
- MongoDB
- npm ou yarn

### Backend

1. **Installer les dépendances :**
```bash
cd backend
npm install
```

2. **Configurer les variables d'environnement :**
Créer un fichier `.env` dans le dossier `backend` :
```env
MONGO_URI=mongodb://localhost:27017/hotel-management
JWT_SECRET=votre_secret_jwt_tres_securise
PORT=5000
```

3. **Démarrer le serveur :**
```bash
npm start
```

### Frontend

1. **Installer les dépendances :**
```bash
cd frontend
npm install
```

2. **Démarrer l'application :**
```bash
npm run dev
```

## 🔐 Utilisation du système

### 1. Inscription et Connexion
- Naviguez vers `/auth/register` pour créer un compte
- Connectez-vous via `/auth/login`
- Utilisez "Mot de passe oublié" si nécessaire

### 2. Interface Admin
- **Dashboard** (`/admin/dashboard`) - Vue d'ensemble avec statistiques
- **Hôtels** (`/admin/hotels`) - Gestion complète des hôtels

### 3. Gestion des Hôtels
- **Créer un hôtel** - Cliquez sur "Créer nouveau hôtel"
- **Modifier** - Utilisez le bouton "Modifier" sur chaque carte
- **Supprimer** - Bouton "Supprimer" avec confirmation

## 🎨 Interface Utilisateur

### Design System
- **Couleurs** - Palette moderne avec gradients
- **Typography** - Segoe UI pour une lisibilité optimale
- **Composants** - Cards, boutons, formulaires cohérents
- **Responsive** - Adaptation mobile et desktop

### Navigation
- **Sidebar** - Menu principal avec icônes
- **Navbar** - Actions rapides et profil utilisateur
- **Breadcrumbs** - Navigation contextuelle

## 🔧 API Endpoints

### Authentification
```
POST /api/auth/register          # Inscription
POST /api/auth/login             # Connexion
POST /api/auth/forgot-password   # Mot de passe oublié
POST /api/auth/reset-password    # Réinitialisation
GET  /api/auth/verify            # Vérification token
```

### Hôtels
```
GET    /api/hotels               # Liste des hôtels
GET    /api/hotels/:id           # Détails d'un hôtel
POST   /api/hotels               # Créer un hôtel
PUT    /api/hotels/:id           # Modifier un hôtel
DELETE /api/hotels/:id           # Supprimer un hôtel
GET    /api/hotels/stats/overview # Statistiques
```

## 🔒 Sécurité

- **JWT Tokens** - Authentification sécurisée
- **Hashage des mots de passe** - bcrypt pour la sécurité
- **Validation** - Côté client et serveur
- **CORS** - Configuration sécurisée
- **Middleware d'authentification** - Protection des routes

## 📊 Modèles de données

### Utilisateur
```javascript
{
  username: String,
  email: String,
  password: String (hashé),
  isAdmin: Boolean,
  createdAt: Date
}
```

### Hôtel
```javascript
{
  name: String,
  address: String,
  email: String,
  phone: String,
  pricePerNight: Number,
  currency: String (XOF/EUR/USD),
  image: String (URL),
  description: String,
  amenities: [String],
  rating: Number,
  isActive: Boolean,
  createdBy: ObjectId,
  createdAt: Date
}
```

## 🚀 Fonctionnalités avancées

### Dashboard
- **Statistiques en temps réel**
- **Graphiques interactifs** (à implémenter)
- **Activité récente**
- **Actions rapides**

### Gestion des hôtels
- **Upload d'images**
- **Validation en temps réel**
- **Soft delete**
- **Recherche et filtres** (à implémenter)

## 🔮 Prochaines étapes

- [ ] **Gestion des clients** - CRUD clients
- [ ] **Système de réservations** - Calendrier et réservations
- [ ] **Gestion des chambres** - Types et disponibilités
- [ ] **Système de paiement** - Intégration Stripe/PayPal
- [ ] **Notifications** - Email et push notifications
- [ ] **Rapports avancés** - Analytics et exports
- [ ] **Gestion des rôles** - Admin, manager, staff
- [ ] **API mobile** - Endpoints pour application mobile

## 🛠️ Technologies utilisées

### Frontend
- **Next.js 15** - Framework React
- **Styled Components** - CSS-in-JS
- **React Hooks** - Gestion d'état
- **Next.js App Router** - Routing moderne

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification
- **bcrypt** - Hashage des mots de passe

## 📞 Support

Pour toute question ou problème :
1. Vérifiez la documentation
2. Consultez les logs du serveur
3. Ouvrez une issue sur le repository

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails. #   H O T E L - M A N A G E M E N T 
 
 
