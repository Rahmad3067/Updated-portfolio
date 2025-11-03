# Portfolio de Rahmad Abuzar

Un portfolio professionnel moderne développé avec React et TypeScript, présentant mes compétences, expériences et projets en tant que développeur fullstack avec des démonstrations interactives.

## 🚀 Fonctionnalités

- **Design moderne et responsive** avec animations fluides et glassmorphism
- **Double navigation** : Mode classique et mode 3D interactif
- **Présentation complète** de mon profil professionnel
- **Démonstrations interactives** de tous les projets avec fonctionnalités complètes
- **Formulaire de contact** fonctionnel avec EmailJS
- **Assistant virtuel** avec chatbot interactif
- **Multilingue** : Français et Anglais avec détection automatique de la langue du navigateur
- **Code refactorisé** : Composants modulaires et fichiers optimisés (< 300 lignes)
- **Optimisé pour les performances** et l'accessibilité

## 📋 Sections du Portfolio

### 🏠 Accueil (Hero)

- Présentation personnelle
- Titre professionnel
- Call-to-action vers les projets et contact
- Navigation fluide

### 👤 À propos

- Informations personnelles détaillées
- Présentation professionnelle
- Coordonnées de contact complètes

### 🎓 Formation

- Parcours éducatif chronologique
- Formations techniques et linguistiques
- Certifications obtenues

### 💼 Expérience Professionnelle

- Historique des emplois (Balyo, Datoscout, etc.)
- Technologies utilisées pour chaque poste
- Descriptions détaillées des responsabilités

### 🛠️ Compétences

- **Techniques** : Langages, frameworks, outils
- **Linguistiques** : Français (DELF B1), Anglais (TOEIC B2), Suédois (B1), Farsi (Bilingue)
- Organisation par catégories

### 🚀 Projets

#### Projets Professionnels

- **Road Editor** : Application de conception de sites robotisés avec React/TypeScript/Three.js
- **Robot Interface Manager** : Dashboard de surveillance et gestion de robots avec React/TypeScript
- **ROI Calculator** : Calculateur de retour sur investissement avec Python/Django
- **Ycsos** : Application de collecte d'informations et calculs avec Python/Django

#### Projets Personnels

- **FocusFlow - AI Productivity App** : Application de productivité alimentée par l'IA avec planification quotidienne, suggestions automatiques, suivi du temps de concentration et visualisations (React, OpenAI API, Node.js)
- **E-Commerce Task Manager** : Gestionnaire de tâches full-stack avec Redux Toolkit, React, Node.js et PostgreSQL

Chaque projet inclut :
- 🎮 **Démo interactive** directement dans le portfolio
- 📁 **Présentation technique** détaillée
- 🏷️ **Technologies** utilisées
- 📊 **Statut** du projet

### 📞 Contact

- Informations de contact complètes
- Formulaire de contact interactif avec EmailJS
- Liens vers LinkedIn
- Statut de soumission en temps réel

### 🌌 Mode 3D Interactif

Activation via le bouton dans la navbar :
- **Navigation spatiale** : Explorez le portfolio dans un univers 3D
- **Planètes interactives** : Chaque section est représentée par une planète
- **Modèles 3D** : City3D avec conduite interactive
- **Contrôles fluides** : Rotation, zoom, et navigation intuitive

### 🤖 Assistant Virtuel

- **Chatbot intelligent** : Posez des questions sur mon parcours
- **Base de connaissances** : Réponses sur compétences, projets, expérience
- **Multi-langue** : Support en français et anglais
- **Interface moderne** : Design glassmorphism avec animations

## 🛠️ Technologies Utilisées

### Frontend

- **React 18** : Framework JavaScript moderne
- **TypeScript** : Typage statique pour plus de robustesse
- **CSS3** : Animations, gradients, glassmorphism, responsive design
- **React Router DOM** : Navigation et routing

### 3D & Graphisme

- **Three.js** : Bibliothèque 3D pour les expériences interactives
- **@react-three/fiber** : React renderer pour Three.js
- **@react-three/drei** : Utilitaires et helpers pour Three.js
- **Canvas API** : Dessin 2D pour les éditeurs

### Backend & State Management

- **Redux Toolkit** : Démonstration de state management
- **Context API** : Gestion d'état pour i18n et contrôles
- **React Hooks** : useReducer, useState, useEffect, etc.

### Communication

- **EmailJS** : Envoi d'emails côté client sans backend
- **Fetch API** : Communication avec services externes

### Outils & Build

- **Create React App** : Toolchain de développement
- **TypeScript** : Compilateur avec vérification de types
- **ESLint** : Linting et qualité de code
- **React Scripts** : Scripts de build et développement

## 🚀 Installation et Démarrage

1. **Cloner le repository**

   ```bash
   git clone https://github.com/rahmad3067/Updated-portfolio.git
   cd Updated-portfolio
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configurer EmailJS** (Optionnel pour le contact)

   - Créez un compte sur [https://www.emailjs.com/](https://www.emailjs.com/)
   - Configurez votre service email et template
   - Mettez à jour `src/config/emailjs.ts` avec vos identifiants

4. **Démarrer le serveur de développement**

   ```bash
   npm start
   ```

5. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 📦 Scripts Disponibles

- `npm start` - Démarre le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm test` - Lance les tests
- `npm run predeploy` - Prépare le build pour GitHub Pages
- `npm run deploy` - Déploie sur GitHub Pages

## 🌍 Internationalisation

Le portfolio supporte plusieurs langues :

- **Détection automatique** : La langue est détectée automatiquement selon les préférences du navigateur
- **Langues supportées** : Français (par défaut) et Anglais
- **Commutateur de langue** : Bouton dans la navigation pour changer de langue
- **Traductions complètes** : Tous les textes sont traduits
- **Persistance** : La langue choisie est mémorisée

### Ajouter une nouvelle langue

1. Ajoutez la nouvelle langue dans `src/contexts/LanguageContext.tsx`
2. Créez les traductions dans l'objet `translations`
3. Ajoutez le bouton de langue dans `LanguageSwitcher.tsx`

## 🎨 Personnalisation

Le portfolio est entièrement personnalisable :

- **Couleurs** : Modifiez les variables CSS dans les fichiers de style
- **Contenu** : Mettez à jour les données dans les composants
- **Sections** : Ajoutez ou supprimez des sections selon vos besoins
- **Projets** : Ajoutez de nouveaux projets avec leurs démos
- **Langues** : Ajoutez de nouvelles langues facilement
- **Contact** : Configurez EmailJS pour recevoir des emails

## 📱 Responsive Design

Le portfolio est entièrement responsive et optimisé pour :

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1200px+)

## 🔧 Structure du Projet

```
src/
├── components/          # Composants React
│   ├── main/           # Composants principaux (Navbar, Hero, Footer)
│   ├── sections/       # Sections du portfolio
│   │   ├── About.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── utils/      # Utilitaires des sections
│   ├── demos/          # Démonstrations interactives
│   │   ├── ecommerce/  # Composants E-Commerce Task Manager
│   │   ├── focusflow/  # Composants FocusFlow AI App
│   │   ├── ECommerceTaskManagerDemo.tsx
│   │   ├── FocusFlowDemo.tsx
│   │   ├── RoadEditorDemo.tsx
│   │   ├── RobotInterfaceDemo.tsx
│   │   ├── ROICalculatorDemo.tsx
│   │   └── YcsosDemo.tsx
│   └── portfolio3d/    # Mode 3D interactif
│       ├── chatbot/    # Base de connaissances du chatbot
│       ├── content/    # Sections modales du mode 3D
│       ├── data/       # Données des sections 3D
│       ├── City3D.tsx  # Environnement 3D principal
│       ├── Portfolio3DSimple.tsx
│       └── Chatbot.tsx
├── contexts/           # Contextes React
│   ├── LanguageContext.tsx
│   └── CarControlsContext.tsx
├── config/             # Configuration
│   └── emailjs.ts      # Configuration EmailJS
├── App.tsx            # Composant principal
├── App.css           # Styles globaux
├── index.tsx         # Point d'entrée
└── index.css         # Styles de base
```

## 🎮 Démonstrations Interactives

Tous les projets incluent des démonstrations fonctionnelles :

### FocusFlow - AI Productivity App
- **Assistant IA** : Suggestions intelligentes basées sur vos tâches
- **Planificateur quotidien** : Génération automatique de plans optimisés
- **Dashboard analytics** : Statistiques de productivité en temps réel
- **Suivi du temps de concentration** : Mesure automatique du temps focalisé
- **Résumés intelligents** : Analyses hebdomadaires de vos performances
- **Catégorisation** : Organisation par travail, personnel, santé, apprentissage
- **Simulation OpenAI API** : Démonstration d'intégration API réelle

### E-Commerce Task Manager
- **Kanban Board** : Gestion visuelle des tâches
- **List View** : Vue liste alternative
- **Redux Toolkit** : Simulation de state management
- **Filtres avancés** : Par catégorie, priorité, recherche
- **Statistiques** : Dashboard de métriques en temps réel

### Road Editor
- **Canvas 2D** : Éditeur de plans robotisés
- **Outils de dessin** : Zones de stockage, palettes, robots, chemins
- **Gestion de couches** : Système de layers
- **Zoom et pan** : Navigation fluide
- **Outils de sélection** : Déplacer, modifier, supprimer

### Robot Interface Manager
- **Monitoring temps réel** : Statut des robots
- **Gestion de batteries** : Suivi et alertes
- **Carte interactive** : Visualisation spatiale
- **Création de tâches** : Assignation et suivi
- **Modals dynamiques** : Interface multi-fenêtres

### ROI Calculator & Ycsos
- **Formulaires dynamiques** : Création de projets/calculs
- **Visualisations** : Graphiques et métriques
- **Gestion de données** : CRUD complet
- **Interface moderne** : Design responsive

## 🌌 Mode 3D

### City3D
- **Environnement 3D** : Ville interactive avec bâtiments
- **Conduite de voiture** : Navigation avec flèches
- **Textures procédurales** : Asphalte, briques, herbe
- **Optimisation** : LOD et rendu efficace

### Portfolio3D / Portfolio3DSimple
- **Navigation spatiale** : Explorez via planètes 3D
- **Interactivité** : Clics, survols, animations
- **Contrôles caméra** : OrbitControls configurés
- **Effets visuels** : Étoiles, environnement, lumières

## 🤖 Assistant Virtuel

- **Base de connaissances** : 20+ sujets couverts
- **Scoring intelligent** : Correspondance optimale des questions
- **Catégories** : À propos, compétences, projets, expérience, contact
- **Suggestions** : Boutons de questions rapides
- **Design moderne** : Glassmorphism avec animations

## 📧 Configuration EmailJS

Le formulaire de contact utilise EmailJS pour envoyer des emails sans backend :

1. Créez un compte sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Configurez un service email (Gmail recommandé)
3. Créez un template avec les variables :
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
4. Mettez à jour `src/config/emailjs.ts` avec vos identifiants
5. Testez le formulaire !

Voir `EMAILJS_SETUP.md` pour un guide détaillé.

## 🚀 Déploiement

Le portfolio peut être déployé sur :

- **GitHub Pages** : `npm run deploy` (configuré)
- **Vercel** : Connectez votre repo GitHub
- **Netlify** : Drag & drop ou GitHub integration
- **Heroku** : Configuration Node.js

### GitHub Pages (Déjà configuré)

```bash
npm run predeploy  # Build l'application
npm run deploy     # Déploie sur gh-pages
```

Le site sera disponible sur : `https://rahmad3067.github.io/Updated-portfolio`

## 🎯 Architecture du Code

### Refactoring et Organisation

Le codebase a été refactorisé pour maintenir une architecture propre :

- **Composants modulaires** : Fichiers < 300 lignes
- **Séparation des responsabilités** : Utils, types, composants UI
- **Réutilisabilité** : Composants partagés entre sections
- **Maintenabilité** : Structure claire et organisée
- **TypeScript** : Typage strict pour plus de robustesse

### Principes de Design

- **Single Responsibility** : Chaque composant a une responsabilité
- **DRY** : Pas de duplication de code
- **KISS** : Simplicité et clarté
- **Composition** : Assemblage de petits composants

## 🧪 Technologies Démontrées

Ce portfolio démontre ma maîtrise de :

- **Frontend** : React, TypeScript, Redux Toolkit, Context API
- **3D Graphics** : Three.js, @react-three/fiber, @react-three/drei
- **State Management** : Redux patterns, React Hooks
- **Backend Concepts** : API simulation, data modeling
- **UI/UX** : Responsive design, animations, glassmorphism
- **DevOps** : CI/CD, automated deployment
- **Code Quality** : TypeScript, ESLint, modular architecture

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 📞 Contact

- **Email** : aboozar919@gmail.com
- **Téléphone** : +33 7 80 56 99 50
- **LinkedIn** : [rahmad-abuzar-83a114214](https://www.linkedin.com/in/rahmad-abuzar-83a114214/)
- **Localisation** : Paris, France

## 🙏 Remerciements

Merci d'avoir visité mon portfolio ! N'hésitez pas à me contacter pour toute opportunité de collaboration.

---

Développé avec ❤️ par Rahmad Abuzar
