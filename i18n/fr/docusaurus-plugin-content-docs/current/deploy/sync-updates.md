---
sidebar_label: Maintenir votre fork à jour
title: Synchronisation des mises à jour AI Short | Fork suivant automatiquement l'amont
description: Faites suivre automatiquement votre fork AI Short avec l'amont — résolvez le problème du déploiement Vercel qui ne détecte pas les mises à jour et activez la synchronisation automatique via GitHub Actions.
---

# Maintenir votre fork à jour

Un déploiement Vercel en un clic peut continuer à afficher une invite « mise à jour disponible » — car Vercel crée un nouveau projet au lieu d'un fork, ce qui empêche la détection des mises à jour en amont. Pour y remédier :

1. Supprimez le dépôt d'origine
2. Utilisez le bouton **Fork** en haut à droite de la page pour forker ce projet
3. Sur la [page nouveau projet Vercel](https://vercel.com/new), réimportez le dépôt forké sous Import Git Repository et déployez

## Activer la mise à jour automatique

> Si vous rencontrez une erreur Upstream Sync, exécutez Sync Fork manuellement une fois !

Après avoir forké, activez manuellement les Workflows sur la page Actions et exécutez l'action Upstream Sync une fois. Une fois activé, le projet se synchronise automatiquement chaque jour :

![Mise à jour automatique](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Activer la mise à jour automatique](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## Mise à jour manuelle

Vous souhaitez mettre à jour immédiatement à la main ? Consultez la [documentation GitHub sur la synchronisation des forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

Vous pouvez également mettre une étoile / surveiller ce projet pour être notifié des nouvelles fonctionnalités.
