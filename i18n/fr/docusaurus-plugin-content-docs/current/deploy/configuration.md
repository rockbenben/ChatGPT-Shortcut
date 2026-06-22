---
sidebar_label: Configuration et personnalisation
title: Configuration et personnalisation AI Short | Modifier le titre, les prompts, backend personnalisé
description: Personnalisez AI Short — modifiez le titre et la description du site, ajoutez des prompts à la page d'accueil, intégrez un backend personnalisé, avec la structure du module API et le mécanisme de cache.
---

# Configuration et personnalisation

AI Short est open source — vous pouvez librement modifier le titre du site, la description, les prompts et bien plus encore.

## Titre et description du site

Modifiez `docusaurus.config.js`.

## Docs et guides

Modifiez les fichiers correspondants dans `docs/`.

## Prompts de la page d'accueil

Les données source se trouvent dans `src/data/prompt.json` — un tableau où chaque objet stocke toutes les versions linguistiques indexées par code de langue (`zh` / `en` / `ja`, etc.). Le format pour ajouter un prompt :

```json
{
  "zh": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "en": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "website": null,
  "tags": ["music"],
  "id": 500,
  "weight": 1
}
```

Après modification, exécutez `python CodeUpdateHandler.py`. Le script divise `prompt.json` en fichiers `prompt_<locale>.json` par langue et met à jour la page d'accueil ainsi que les pages de prompts en vedette de chaque langue.

![Pipeline de données : le fichier maître prompt.json traité par python CodeUpdateHandler.py — divisé par langue en fichiers de prompts par locale, générant le JSON de carte et la page de détail de chaque id, avec conversion OpenCC du chinois simplifié vers le traditionnel](/img/docs/data-pipeline.svg)

> **Remarque** : définissez `id` à 500 ou plus afin d'éviter tout conflit d'ID avec les prompts existants ou les contenus de la communauté. L'exécution de `python CodeUpdateHandler.py` génère automatiquement les données de carte et la page de détail de chaque prompt (y compris les nouveaux), sans qu'il soit nécessaire de créer manuellement un fichier de page ; par défaut, les prompts personnalisés n'ont simplement pas de méta-description en vedette ni de données de commentaires.

## Backend personnalisé

Par défaut, le projet se connecte à un backend partagé (connexion, favoris, communauté, commentaires et synchronisation entre appareils en dépendent tous), et `src/api` documente l'intégralité du contrat d'interface à titre de référence. Le service backend lui-même n'est pas open source ; pour un **déploiement entièrement auto-hébergé avec son propre backend**, voir [Choisir un modèle de déploiement](../deploy#choisir-un-modèle-de-déploiement).

Structure du module API :

```
src/api/
├── index.ts       # unified export entry
├── config.ts      # API URL configuration
├── client.ts      # Axios client (with auth interceptor)
├── auth.ts        # auth API (login/register/OAuth)
├── prompts.ts     # prompt CRUD + search + voting
├── favorites.ts   # favorites operations
├── myspace.ts     # My Space data (core data source)
├── comments.ts    # comment system
└── user.ts        # user info
```

Mise en cache : les données de l'API sont mises en cache intelligemment via `lscache` et ETag — lorsque le serveur renvoie 304 Not Modified, le cache local est réutilisé afin de réduire le transfert de données.
