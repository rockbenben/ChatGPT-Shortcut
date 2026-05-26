---
sidebar_label: FAQ
title: FAQ AI Short | Optimisation des prompts et gestion des hallucinations
description: "Les résultats des prompts ne sont pas satisfaisants ? L'IA produit de fausses informations ? Ce guide répond aux questions fréquentes : optimisez vos prompts, évitez les hallucinations et sauvegardez vos données."
---

# FAQ

## AiShort est-il payant ?

La version web d'AiShort est **entièrement gratuite** : parcourir, copier et rechercher des prompts ne nécessite aucun paiement, ni même d'inscription. Les fonctionnalités avancées disponibles après connexion (collection, prompts personnalisés, partage communautaire) sont également gratuites.

Remarque : AiShort ne fournit que les prompts. **L'utilisation du modèle d'IA lui-même peut être payante ou non selon le service que vous utilisez** (par exemple ChatGPT version gratuite/payante, facturation à l'API, etc.).

## Quels modèles d'IA sont pris en charge ?

Les prompts d'AiShort sont universels et fonctionnent dans **n'importe quel scénario d'IA** : pages de conversation, outils de codage de type Cursor, appels API, agents, etc. Ils sont compatibles avec :

- Principaux modèles : ChatGPT, Gemini, Claude, Le Chat (Mistral AI), Grok, DeepSeek
- Plateformes API : OpenRouter, Groq, Hugging Face Chat
- Modèles chinois (Tongyi Qianwen, Ernie Bot, Doubao, Kimi, etc.) : disponibles si vous travaillez avec un public sinophone

Pour plus de modèles, voir [Bien commencer → Modèles d'IA courants](./getting-started#modèles-dia-courants).

## Pourquoi utiliser des prompts en anglais ?

La plupart des modèles d'IA ont été entraînés majoritairement sur des données en anglais : ils comprennent donc mieux les instructions anglaises et produisent des résultats plus stables et plus cohérents. Les prompts en français fonctionnent aussi — surtout avec Le Chat de Mistral ou les versions récentes de ChatGPT, Claude et Gemini — mais reformuler plusieurs fois un même prompt en français peut entraîner des variations notables. Pour les usages exigeants (rédaction structurée, code, raisonnement), préférez l'anglais.

> 💡 Vous voulez quand même une réponse en français ? Ajoutez simplement `Réponds en français.` ou `Respond in French.` à la fin du prompt anglais — vous bénéficiez ainsi de la précision de l'instruction anglaise et d'une sortie dans votre langue.

## Dois-je entrer le prompt à chaque fois ?

**Utilisation de l'API** : définissez le prompt comme `system prompt`, il s'appliquera automatiquement aux conversations suivantes.

**Version web** : tant que vous ne changez pas de conversation, ChatGPT mémorise le prompt actuel. Si la réponse commence à dévier, c'est qu'il l'a "oublié" — recollez-le simplement.

**Astuce** : enregistrez les conversations fréquemment utilisées comme signets pour un accès rapide.

## Pourquoi ne puis-je pas trouver de prompts associés ?

La recherche sur la page d'accueil porte sur la **bibliothèque de prompts sélectionnés** (et, après connexion, sur vos prompts personnels), **mais pas** sur les prompts partagés par la communauté.

Si vous ne trouvez rien sur la page d'accueil avec un mot-clé court, relancez la recherche sur la page [Prompts de la communauté](./community) — vous y trouverez davantage de contenus partagés par les utilisateurs.

## Que faire si l'IA produit de fausses informations ?

L'IA produit parfois des "hallucinations" : des informations qui paraissent plausibles mais sont en réalité fausses. Pour y remédier :

1. **Vérifier les informations clés** : surtout les données, citations, code, etc.
2. **Optimisation en plusieurs tours** : demandez à l'IA de revérifier et d'améliorer sa réponse
3. **Vérification croisée** : utilisez d'autres prompts ou modèles pour valider les conclusions importantes

Des prompts bien formulés réduisent les hallucinations de l'IA.

## Comment sauvegarder mes prompts ?

1. Allez dans "Mon Compte" → rubrique "Gestion des données → Exporter les prompts"
2. Cliquez sur le bouton "Exporter les données"
3. Le système génère automatiquement un fichier JSON à télécharger

Il est recommandé de sauvegarder régulièrement pour éviter toute perte de données.

## Les résultats des prompts ne sont pas idéaux ?

1. **Demandez à l'IA d'optimiser** : faites-lui noter sa propre réponse et l'améliorer
2. **Changez d'angle** : utilisez des prompts différents pour exprimer le même besoin
3. **Essayez la communauté** : les [Prompts de la communauté](./community) contiennent peut-être une version plus adaptée — et n'hésitez pas à y partager vos propres trouvailles
4. **Faites-nous part de vos retours** : si vous rencontrez un problème ou avez une suggestion, contactez-nous via [Retour d'expérience](/feedback)

## Documentation associée

- [Bien commencer](./getting-started) - Méthodes d'utilisation de base
- [Ma collection](./my-collection) - Gestion des collections et des balises
- [Prompts de la communauté](./community) - Découvrir et partager
