---
sidebar_label: Prompts personnalisés
title: Prompts personnalisés AI Short | Création, édition et partage
description: Créez vos propres prompts IA et sauvegardez-les dans votre compte pour un accès permanent. Partagez-les avec la communauté ou gardez-les privés ; exportez vos données en un clic.
---

# Prompts personnalisés

Après connexion, vous pouvez créer vos propres prompts et les enregistrer dans votre compte pour y accéder rapidement par la suite. Les prompts personnalisés apparaissent dans la vue «&nbsp;Ma Collection&nbsp;».

## Créer un prompt

1. Après connexion, cliquez sur le bouton «&nbsp;**Créer un prompt**&nbsp;» en haut de la page
2. Remplissez le dialogue «&nbsp;Créer un prompt&nbsp;»&nbsp;:
   - **Nom du prompt** (obligatoire)&nbsp;: un nom pour le prompt
   - **Contenu du prompt** (obligatoire)&nbsp;: le corps du prompt&nbsp;; le texte entre crochets `[...]` est mis en évidence comme espace réservé à l'affichage
   - **Utilisation** (facultatif)&nbsp;: une brève description de ce que fait le prompt
   - **Remarques** (facultatif)&nbsp;: source, versions en d'autres langues, ou notes complémentaires
3. L'interrupteur «&nbsp;Souhaitez-vous partager ce prompt sur la page publique&nbsp;?&nbsp;» en bas est activé par défaut — désactivez-le pour rendre le prompt privé
4. Cliquez sur «&nbsp;Créer un prompt&nbsp;» pour valider

![Fenêtre de création de prompt](/img/docs/user-prompts-create.png)

> 💡 **Exemple** — un prompt «&nbsp;Générateur de compte-rendu de standup&nbsp;»&nbsp;:
> - **Nom du prompt**&nbsp;: Générateur de compte-rendu de standup
> - **Contenu du prompt**&nbsp;: Tu es un assistant de communication concis. Transforme les notes suivantes en un compte-rendu de standup quotidien avec trois sections — Hier, Aujourd'hui, Blocages. Garde chaque point court et axé sur les résultats&nbsp;: [mes notes brutes]
> - **Utilisation**&nbsp;: Convertit des notes désorganisées en un compte-rendu de standup propre
> - **Remarques**&nbsp;: À utiliser avant le standup matinal

## Éditer un prompt

Dans la vue Ma Collection, cliquez sur le bouton d'édition (crayon) sur la carte d'un prompt que vous avez créé pour ouvrir le dialogue «&nbsp;Éditer le prompt&nbsp;». Vous pouvez&nbsp;:

- Modifier le nom, le contenu, l'utilisation et les remarques
- Basculer le statut de partage (public / privé)
- Cliquer sur «&nbsp;Enregistrer&nbsp;» pour mettre à jour

![Interface d'édition de prompt](/img/docs/user-prompts-edit.png)

## Supprimer un prompt

Cliquez sur «&nbsp;Supprimer&nbsp;» dans le dialogue d'édition. La suppression est irréversible — soyez prudent.

## Partager avec la communauté

Lors de la création ou de l'édition, l'interrupteur «&nbsp;Souhaitez-vous partager ce prompt sur la page publique&nbsp;?&nbsp;» en bas contrôle la visibilité&nbsp;:

- **Activé (par défaut)**&nbsp;: le prompt apparaît sur la page [Prompts de la communauté](./community), où les autres utilisateurs peuvent le voir et le collectionner
- **Désactivé**&nbsp;: prompt privé — visible uniquement par vous

Le statut de partage peut être modifié à tout moment.

## Exporter les prompts

1. Allez dans «&nbsp;Mon Compte&nbsp;» et trouvez la rubrique «&nbsp;Gestion des Données → Exporter les prompts&nbsp;»
2. Cliquez sur le bouton «&nbsp;Exporter les Données&nbsp;»
3. Le système génère un fichier JSON et le télécharge automatiquement

Le contenu exporté comprend&nbsp;:

- Le nom, le contenu, l'utilisation et les remarques du prompt
- Le statut de partage
- Vos collections, l'ordre de vos collections et vos balises personnalisées

Des exports réguliers sont recommandés pour éviter toute perte de données.

## Importer des prompts

Importez des prompts et des collections depuis un fichier JSON&nbsp;:

1. Allez dans «&nbsp;Mon Compte&nbsp;» et trouvez la rubrique «&nbsp;Gestion des Données → Importer les prompts&nbsp;»
2. Cliquez sur le bouton «&nbsp;Importer les données&nbsp;»
3. Sélectionnez un fichier JSON
4. Le système fusionne automatiquement les données (déduplication par titre&nbsp;; les prompts dont l'ID appartient à un autre compte passent automatiquement en privé)

### Collaboration en équipe

Workflow recommandé pour partager des prompts au sein d'une équipe&nbsp;:

1. **Filtrer et partager**&nbsp;: après l'export, supprimez manuellement la liste de vos collections ou filtrez pour ne conserver que les prompts à partager, puis envoyez le fichier aux membres de l'équipe pour qu'ils l'importent
2. **Protection de la vie privée**&nbsp;: les prompts importés appartenant à d'autres utilisateurs (ID n'appartenant pas au compte courant) passent automatiquement en **privé**, de sorte que les données de chaque membre restent séparées

## Documentation associée

- [Ma collection](./my-collection) - Gestion des collections et des balises
- [Prompts de la communauté](./community) - Partage et vote
- [Gestion de compte](./account) - Connexion et paramètres
