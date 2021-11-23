# Serveur node backend Chicky
Ce repo contient les fonctions a consommer par notre application iOS (chicky)

## Construit avec
- Javascript 
- NodeJs 
- MongoDB 
- ExpressJS

## Requis
- Node-js
- Nodemon

## Usage
1. Ouvrir terminal
2. Ecrire les commandes :
- <span style="color:blue">cd </span>[emplacement du projet]
- <span style="color:blue">npm </span>install
- <span style="color:blue">npm run server</span>

## Fonctions
* Utilisateur
- Connexion (POST): <a href ="localhost:3000/api.chicky.com/utilisateur/connexion">localhost:3000/api.chicky.com/utilisateur/connexion</a>
- Inscription (POST): <a href ="localhost:3000/api.chicky.com/utilisateur/inscription">localhost:3000/api.chicky.com/utilisateur/inscription</a>
- /confirmation/:token (GET): <a href ="localhost:3000/api.chicky.com/confirmation/:token">localhost:3000/api.chicky.com/utilisateur/confirmation/:token</a>
- ModifierProfil (PUT): <a href ="localhost:3000/api.chicky.com/modifierProfil">localhost:3000/api.chicky.com/utilisateur/modifierProfil</a>

## Auteurs
- Mohamed Jameleddine Bouassida
- Maher Ali