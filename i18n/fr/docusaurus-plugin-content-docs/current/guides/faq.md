---
sidebar_label: FAQ
title: "AI Short FAQ | Utilisation, Optimisation, Commercial & Confidentialité"
description: "AiShort est-il gratuit ? Les prompts sont-ils multi-modèles ? Usage commercial possible ? Ce guide répond à 13 questions sur utilisation, optimisation, commercial et confidentialité."
---

# FAQ

## AiShort est-il un générateur de prompts IA ?

Non. AiShort est une bibliothèque de modèles de prompts **sélectionnés et organisés** par scénario, pas un outil qui génère automatiquement des prompts via un LLM. Chaque prompt est trié et classé par tag, prêt à copier-coller dans ChatGPT, Claude, Gemini, DeepSeek ou tout autre outil de conversation IA. Si vous cherchez un outil de type « générer un prompt à partir d'un besoin », PromptPerfect ou ChatGPT prompt generator sont d'une autre catégorie.

## AiShort est-il gratuit ? Faut-il une clé API ?

Totalement gratuit, **sans clé API et sans inscription**. Parcourir, rechercher et copier des prompts ne demande aucun compte.

Après inscription, vous débloquez des fonctionnalités avancées — favoris avec tri par glisser-déposer, tags personnalisés, création et gestion de prompts privés, partage communautaire et vote, export JSON, synchronisation multi-appareils — qui restent gratuites. Le code source est entièrement ouvert sur [GitHub](https://github.com/rockbenben/ChatGPT-Shortcut).

À noter : AiShort fournit uniquement les prompts. **L'utilisation du modèle IA lui-même peut être payante ou non selon le service que vous choisissez** (ChatGPT version gratuite/payante, facturation à l'API, etc.).

## Combien de prompts ? Quels scénarios sont couverts ?

AiShort héberge **plus de 5000 prompts au total**, répartis en deux bibliothèques :

- **Bibliothèque curatée** —— sélectionnés manuellement, classés par 25+ tags de scénarios, entièrement traduits en 18 langues. Tags : aide à la rédaction, IT/programmation, articles/rapports, SEO/marketing, fonctions d'entreprise, universitaires/enseignants, éducation/étudiants, langue/traduction, psychologie/social, entraînement mental, outils de productivité, terminal/interpréteur, débat/discours, critique/évaluation, science amusante, encyclopédie de la vie, santé médicale, conseiller financier, musique/art, philosophie/religion, texte/mots, jeux amusants, conseiller professionnel, etc.
- **[Bibliothèque communautaire](./community)** —— la grande majorité, alimentée en continu par les utilisateurs, triable par popularité ou nouveauté avec recherche ; couvre des scénarios plus fins et plus larges que la curatée.

Si vous ne trouvez pas votre bonheur dans la curatée, cherchez dans la communauté.

## Quels modèles IA sont pris en charge ? Les prompts sont-ils multi-modèles ?

Les prompts d'AiShort sont universels et fonctionnent **dans tout contexte IA acceptant un prompt** — pas seulement les pages de chat, mais aussi les outils de programmation type Cursor, les appels d'API, les agents IA, etc. Voici les modèles de conversation courants :

- International : ChatGPT, Gemini, Claude, Grok, Le Chat (Mistral AI)
- Chine : DeepSeek, Tongyi Qianwen, Ernie Bot, Doubao, Kimi, Zhipu Qingyan, iFlytek Spark, Tencent Yuanbao
- Plateformes API : OpenRouter, SiliconFlow, Groq

Plus de modèles sur [Bien commencer → Modèles IA courants](./getting-started#modèles-dia-courants).

**Compatibilité multi-modèles** : la grande majorité des prompts texte sont transférables d'un modèle à l'autre — pour les tâches génériques (rédaction, traduction, programmation, questions/réponses), un même prompt produit des résultats utilisables sur les principaux LLM, et AiShort ne lie par défaut aucun prompt à un modèle précis. La seule exception concerne les prompts d'image (Midjourney / Stable Diffusion / DALL·E), qui doivent être adaptés à la syntaxe de chaque outil.

## Pourquoi les prompts sont-ils rédigés en anglais ?

Les modèles IA comprennent l'anglais plus précisément et produisent des résultats plus stables. Les prompts en français fonctionnent aussi, mais une même formulation française relancée plusieurs fois génère des variations notables. Pour les usages exigeants, préférez l'anglais.

> 💡 Vous voulez une réponse en français ? Ajoutez `respond in French` à la fin du prompt.

## Faut-il saisir le prompt à chaque fois ?

**Appel API** : définissez le prompt comme `system prompt`, il s'appliquera automatiquement aux échanges suivants.

**Version web** : tant que vous ne changez pas de conversation, ChatGPT mémorise le prompt en cours. Si la réponse commence à dévier, c'est qu'il l'a « oublié » — il suffit de le recoller.

**Astuce** : enregistrez les conversations que vous utilisez souvent comme signets de navigateur pour un accès direct.

## Comment choisir le bon prompt ?

Partez du résultat que vous voulez : pour rédiger un article, utilisez les tags [`write`](/?tags=write) ou [`article`](/?tags=article) ; pour coder, [`code`](/?tags=code) ou [`interpreter`](/?tags=interpreter) ; pour traduire, [`language`](/?tags=language) ; pour le jeu de rôle, [`games`](/?tags=games) ; si vous ne connaissez pas les tags, lancez directement une recherche par mot-clé. Chaque carte de prompt affiche sa popularité (nombre de copies) — les plus copiées sont en général les plus fiables.

## Pourquoi je ne trouve pas de prompt pertinent ?

La recherche de la page d'accueil couvre la **bibliothèque de prompts sélectionnés** (et, après connexion, vos prompts personnels), mais **pas** les prompts partagés par la communauté.

Si une recherche avec un mot-clé court ne donne rien sur la page d'accueil, relancez-la sur la page [Prompts de la communauté](./community) — vous y trouverez davantage de contributions d'utilisateurs.

## Que faire si l'IA produit des informations fausses ?

L'IA produit parfois des « hallucinations » : des informations qui paraissent plausibles mais sont en réalité fausses. Voici comment procéder :

1. **Vérifiez les informations clés** : données chiffrées, citations, code, etc.
2. **Optimisez en plusieurs tours** : demandez à l'IA de relire et d'améliorer sa réponse
3. **Validation croisée** : utilisez d'autres prompts ou d'autres modèles pour confirmer les conclusions importantes

Un prompt bien formulé réduit les hallucinations.

## Le prompt ne donne pas un bon résultat — comment l'ajuster ?

Ne changez pas tout de suite de prompt ; commencez par ajuster sur ces axes :

1. **Précisez les `[espaces réservés]` entre crochets** — ajoutez le style, la longueur, le domaine, le profil du lecteur, etc.
2. **Faites itérer l'IA** : à une réponse insatisfaisante, demandez « rends-la plus X » ou « réécris dans le style Y ». En une ou deux itérations, l'IA s'approche du résultat voulu ; vous pouvez aussi lui demander de noter sa propre réponse et de l'améliorer
3. **Comparez les modèles** : reprenez le même prompt sur un autre modèle (Claude / ChatGPT / Gemini / DeepSeek, etc.) — chaque modèle a ses points forts, et les résultats peuvent varier sensiblement
4. **Essayez la communauté** : les [Prompts de la communauté](./community) contiennent peut-être une variante plus adaptée — et n'hésitez pas à y partager vos meilleurs prompts
5. **Faites un retour** : si vous rencontrez un problème ou avez une suggestion, partagez-le via [Retour d'expérience](/feedback)

## Comment sauvegarder mes prompts ?

1. Allez dans « Mon Compte » → rubrique « Gestion des données → Exporter les prompts »
2. Cliquez sur le bouton « Exporter les données »
3. Le système génère automatiquement un fichier JSON à télécharger

Pensez à sauvegarder régulièrement pour éviter toute perte de données.

## Puis-je utiliser les prompts d'AiShort dans des projets commerciaux ?

Oui, mais la licence dépend de l'origine :

1. Les contenus issus d'[Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts) sont placés en **domaine public CC0**, sans aucune restriction
2. Les contenus créés par AiShort et la communauté sont par défaut publiés sous licence ouverte **CC BY-SA 4.0** — usage commercial, redistribution et adaptation sont autorisés, à condition de conserver la mention d'AiShort / de l'auteur d'origine et de garder l'ouverture en aval
3. **Le contenu IA généré à partir d'un prompt** vous appartient selon les conditions d'utilisation du fournisseur IA (OpenAI, Anthropic, Google, etc.) — dans la plupart des cas, il vous revient
4. Exception : les rares fiches de prompts portant explicitement la mention « usage personnel uniquement »

## La copie d'un prompt révèle-t-elle mes données ?

Non. Les prompts d'AiShort sont empaquetés sous forme de JSON statique dans les ressources du site, et **l'action de copie elle-même se fait dans le presse-papiers local de votre navigateur**.

Le **contenu que vous saisissez dans les espaces réservés entre crochets et les réponses que vous obtenez de l'IA** transitent directement entre vous et la plateforme IA choisie (ChatGPT, Claude, Gemini, DeepSeek, etc.) — AiShort n'y a pas accès.

Précision : au moment de la copie, un **événement de comptage anonyme** est envoyé au backend (POST `/cards/<id>/copy`), uniquement pour mesurer la popularité de chaque prompt (le compteur de « copies » affiché sur la carte). **Seul l'ID de la carte est transmis**, sans le contenu que vous avez saisi, sans information personnelle, sans lien avec votre identité.

**Après connexion**, votre liste de favoris, vos prompts personnalisés et vos contributions à la communauté sont synchronisés vers le backend pour le multi-appareils, avec export JSON et suppression totale possibles à tout moment.

## Documentation associée

- [Bien commencer](./getting-started) - Méthodes d'utilisation de base
- [Ma collection](./my-collection) - Gestion des collections et des tags
- [Prompts de la communauté](./community) - Découvrir et partager
