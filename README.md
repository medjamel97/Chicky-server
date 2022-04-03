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
* User
- Connexion (POST): <a href ="localhost:3000/api/user/connexion">localhost:3000/api/user/connexion</a>
- Inscription (POST): <a href ="localhost:3000/api/user/inscription">localhost:3000/api/user/inscription</a>
- Confirmation email (GET): <a href ="localhost:3000/api/confirmation/:token">localhost:3000/api/user/confirmation/:token</a>
- ModifierProfil (PUT): <a href ="localhost:3000/api/editProfil">localhost:3000/api/user/editProfil</a>

## Auteurs
- Mohamed Jameleddine Bouassida
- Maher Ali
