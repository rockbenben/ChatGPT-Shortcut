---
sidebar_label: Prompts personnalisés
title: Prompts personnalisés AI Short | Création, édition et partage
description: Créez vos propres prompts IA et sauvegardez-les dans votre compte pour un accès permanent. Partagez-les avec la communauté ou gardez-les privés ; exportez vos données en un clic.
---

# Prompts personnalisés

Après connexion, vous pouvez créer vos propres prompts et les enregistrer dans votre compte pour les réutiliser à volonté. Vos prompts personnalisés apparaissent dans la vue "Ma collection".

## Créer un prompt

1. Cliquez sur le bouton "Ajouter" en haut à droite
2. Dans la fenêtre "Créer un prompt" qui s'ouvre, remplissez le formulaire :
   - **Nom du prompt** (obligatoire) : donnez un nom à votre prompt
   - **Contenu du prompt** (obligatoire) : le texte du prompt
   - **Utilisation** (facultatif) : brève description de ce que fait le prompt
   - **Remarques** (facultatif) : source, versions en d'autres langues, notes complémentaires
3. L'interrupteur "Souhaitez-vous partager ce prompt sur la page publique ?" en bas est activé par défaut — désactivez-le pour le rendre privé
4. Cliquez sur "Créer un prompt" pour valider

![Fenêtre de création de prompt](/img/docs/user-prompts-create.png)

> 💡 **Exemple concret** — un prompt « Assistant de compte-rendu de réunion » :
> - **Nom du prompt** : Assistant de compte-rendu de réunion
> - **Contenu du prompt** : Tu es un assistant de rédaction professionnel. À partir des notes brutes ci-dessous, rédige un compte-rendu de réunion clair et structuré, comprenant : un résumé de l'ordre du jour, les principales décisions prises, les actions à mener avec leurs responsables et échéances. Reste concis et factuel. Notes : [coller ici vos notes de réunion]
> - **Utilisation** : transformer des notes prises au fil de l'eau en compte-rendu diffusable aux participants
> - **Remarques** : idéal après les réunions d'équipe ou les points clients ; vérifier les noms et les échéances avant envoi

## Éditer un prompt

Dans la vue Ma collection, cliquez sur la carte d'un prompt que vous avez créé pour ouvrir la fenêtre "Éditer le prompt". Vous pouvez :

- Modifier le nom, le contenu, l'utilisation, les remarques
- Basculer le statut de partage (public / privé)
- Cliquer sur "Enregistrer" pour mettre à jour

![Interface d'édition de prompt](/img/docs/user-prompts-edit.png)

## Supprimer un prompt

Dans la fenêtre d'édition, cliquez sur "Supprimer". La suppression est irréversible — soyez prudent.

## Partager avec la communauté

Lors de la création ou de l'édition, l'interrupteur "Souhaitez-vous partager ce prompt sur la page publique ?" en bas contrôle la visibilité :

- **Activé (par défaut)** : le prompt apparaît sur la page [Prompts de la communauté](./community) ; les autres utilisateurs peuvent le voir et le collectionner
- **Désactivé** : prompt privé, visible uniquement par vous

Le statut de partage peut être modifié à tout moment.

## Exporter une sauvegarde

1. Allez dans "Mon Compte" → rubrique "Gestion des données → Exporter les prompts"
2. Cliquez sur le bouton "Exporter les données"
3. Le système génère un fichier JSON et le télécharge automatiquement

L'exportation contient :

- Le nom, le contenu, l'utilisation et les remarques de chaque prompt
- Les dates de création et de mise à jour
- Le statut de partage

Il est recommandé d'exporter régulièrement pour éviter toute perte de données.

## Importer des prompts

Importez des prompts et des favoris depuis un fichier JSON :

1. Allez dans "Mon Compte" → rubrique "Gestion des données → Importer les prompts"
2. Cliquez sur le bouton "Importer les données"
3. Sélectionnez le fichier JSON
4. Le système fusionne automatiquement les données (déduplication par titre ; les prompts dont l'ID appartient à un autre utilisateur passent automatiquement en privé)

### Collaboration en équipe

Workflow recommandé pour partager des prompts au sein d'une équipe :

1. **Filtrer et partager** : après l'export, supprimez manuellement la liste des favoris ou ne conservez que les prompts à partager, puis envoyez le fichier aux membres de l'équipe pour qu'ils l'importent
2. **Protection de la vie privée** : les prompts importés provenant d'un autre utilisateur (ID n'appartenant pas au compte courant) passent automatiquement en **privé**, garantissant l'isolation des données entre les membres

## Documentation associée

- [Ma collection](./my-collection) - Gestion des collections et des balises
- [Prompts de la communauté](./community) - Partage et vote
- [Gestion de compte](./account) - Connexion et paramètres
