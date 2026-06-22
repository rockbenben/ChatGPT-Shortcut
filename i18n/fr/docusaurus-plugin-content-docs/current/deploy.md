---
sidebar_label: Déploiement
title: Déploiement AI Short - Vercel/Docker Facile
description: Déployez votre propre bibliothèque de prompts. Guide complet pour Vercel et Docker, incluant la configuration et les mises à jour auto.
---

# Déploiement du projet

> **À qui s'adresse ce guide** : aux développeurs qui souhaitent héberger ou personnaliser AiShort. Les utilisateurs ordinaires peuvent simplement utiliser [aishort.top](https://www.aishort.top) — pas besoin de lire ceci.

## Choisir un modèle de déploiement

Choisissez le modèle qui correspond à vos besoins :

| Modèle                              | Backend                                             | Remarques                                                                                                                                                                                          |
| ----------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Standard** (par défaut)           | Réutilise le backend partagé officiel               | Après un fork, vous pouvez personnaliser le nom du site, la description, les prompts, etc. (voir [Configuration](./deploy/configuration)) ; connexion, favoris, communauté et synchronisation fonctionnent immédiatement |
| **Version hors ligne**              | Aucun backend, données stockées localement dans le navigateur | Réseaux d'entreprise ou gouvernementaux isolés ; aucun compte nécessaire                                                                                                                           |
| **Backend entièrement auto-hébergé** | Votre propre backend indépendant                   | Lorsque vous avez besoin d'un système de comptes indépendant, d'une propriété complète des données et d'une communauté privée                                                                      |

Les deux premiers modèles sont couverts dans ce guide. Pour le troisième, le service backend n'étant pas open source, veuillez [envoyer un e-mail au développeur](mailto:qingwhat@gmail.com) en décrivant brièvement votre cas d'usage et votre volume afin d'obtenir un plan de déploiement et du support.

## Documentation de déploiement

Le processus de déploiement est réparti dans les pages suivantes, à consulter selon vos besoins :

- **[Déploiement standard](./deploy/standard)** —— réutilise le backend partagé officiel, avec quatre méthodes : build local, Vercel, Cloudflare Pages et Docker.
- **[Version hors ligne (intranet d'entreprise)](./deploy/offline)** —— solution hors ligne pour les intranets d'entreprise, réseaux gouvernementaux et autres environnements isolés, sans backend ni compte.
- **[Configuration et personnalisation](./deploy/configuration)** —— modifiez le titre du site, la description, les prompts, et intégrez un backend personnalisé.
- **[Maintenir votre fork à jour](./deploy/sync-updates)** —— faites suivre automatiquement votre fork avec l'amont pour éviter de prendre du retard sur les fonctionnalités.
