# tp2-dabin-matthieu

## Info

mail: matthieu.dabin@ynov.com

github_username: Coolcall

## Objectifs

L'objectif de ce TP est d'utiliser une api en nodeJS qui est associée à un reverse proxy nginx. Et d'obtenir des informations provenant de bases de données redis et postgresql.

## Installation

Ouvrir un powershell 
 
Récupérer le dépôt Git via la commande :  `git clone https://github.com/YI-B3-Devops-G1/tp2-dabin-matthieu.git`

Il faut ensuite se positionner à la racine du projet et lancer la commande:  `docker-compose up --build`

## Utilisation

`localhost`  Page d'accueil Nginx

`localhost/api`  Page de l'API

`localhost/api/status`  Page qui récupère le uptime grâce à postgresql et le nombre de clients connecté grâce à redis