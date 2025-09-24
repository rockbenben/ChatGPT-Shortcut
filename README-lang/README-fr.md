<h1 align="center">
⚡️AI Short
</h1>
<p align="center">
    <a href="/README-en.md">English</a> | <a href="/README.md">中文</a> |
<a href="./README-es.md">Español</a> |
<a href="./README-ja.md">日本語</a> |
<a href="./README-ko.md">한국어</a> |
Français |
<a href="./README-de.md">Deutsch</a> |
<a href="./README-it.md">Italiano</a> |
<a href="./README-ru.md">Русский</a> |
<a href="./README-pt.md">Português</a> |
<a href="./README-ar.md">العربية</a> |
<a href="./README-hi.md">हिन्दी</a> |
<a href="./README-bn.md">বাংলা</a>
</p>
<p align="center">
    <em>ChatGPT Shortcut, Maximize your Efficiency and Productivity</em>
</p>

## Pourquoi utiliser AiShort ?

AiShort (Raccourci ChatGPT) fournit une liste concise et facile à utiliser d'invites pour l'IA. Il est conçu pour aider les utilisateurs à trouver rapidement des invites adaptées à divers scénarios, ce qui le rend facile à utiliser même pour les débutants et améliore de manière globale leur efficacité dans l'apprentissage et le travail.

🚀 **Invites en un clic** : Une sélection de diverses invites professionnelles. En un seul clic, vous pouvez les envoyer à des modèles d'IA comme ChatGPT et obtenir rapidement les réponses souhaitées.

💻 **Augmentez votre productivité** : Utilisez des invites optimisées pour obtenir des retours plus précis et pratiques, et accomplissez efficacement vos tâches d'apprentissage et de travail.

🌍 **Support multilingue** : Fournit des traductions pour les invites en anglais dans 12 langues principales et prend en charge les réponses par défaut dans votre langue maternelle, permettant aux utilisateurs non anglophones de l'utiliser sans barrière.

💾 **Collecter & Éditer** : Vous pouvez collecter, éditer et gérer vos invites préférées à tout moment pour une utilisation future.

📤 **Exporter & Sauvegarder** : Exportez toutes vos invites en un seul clic, avec prise en charge du format JSON pour la sauvegarde, ce qui facilite la migration et la sauvegarde locale.

🌟 **Partager des invites** : Partagez vos invites préférées avec d'autres pour inspirer plus de créativité et d'idées.

🗳️ **Vote de la communauté** : Similaire à Product Hunt ou Reddit, piloté par les votes de la communauté, les excellentes invites seront recommandées sur la page d'accueil.

📦 **Prêt à l'emploi** : Aucune configuration complexe n'est nécessaire. Visitez [aishort.top](https://www.aishort.top/fr/) pour commencer à l'expérimenter immédiatement.

Les invites pour AiShort (Raccourci ChatGPT) proviennent de sélections en ligne, de partages de la communauté et de [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts). Nous les mettons à jour régulièrement pour vous apporter continuellement de nouvelles invites et de l'inspiration. Pour des instructions détaillées, veuillez consulter le [Guide de l'utilisateur](https://www.aishort.top/fr/docs/guides/getting-started).

Bienvenue à rejoindre notre communauté pour échanger des idées et des commentaires :

<a href="https://t.me/aishort_top">
    <img src="https://img.shields.io/badge/Telegram-Group-blue?logo=telegram&style=for-the-badge" alt="join Telegram group" />
</a>

<a href="https://discord.gg/PZTQfJ4GjX">
    <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="chat on Discord" />
</a>

## Extension de navigateur

L'extension AiShort (Raccourci ChatGPT) vous aide à accéder à la bibliothèque d'invites AiShort à tout moment pour améliorer votre efficacité au travail et dans vos études. Elle prend en charge les principaux navigateurs comme Chrome, Edge et Firefox, et dispose d'une barre latérale qui peut être rapidement invoquée avec le raccourci `Alt + Shift + S`.

- **Chrome** : [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge** : [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox** : [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub** : [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

De plus, nous proposons le script Tampermonkey - [**ChatGPT Shortcut Anywhere**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere), permettant aux utilisateurs de personnaliser les noms de domaine correspondants et d'utiliser la barre latérale AiShort sur n'importe quel site web. Cependant, en raison des restrictions d'injection de contenu de script sur la page ChatGPT, la fonctionnalité de la barre latérale du script est activée via une fenêtre contextuelle sur la page ChatGPT.

## Déploiement

Pour des étapes détaillées sur le déploiement via un environnement local, Vercel, Cloudflare Page, Docker, et la modification du projet, veuillez vous référer au [Guide de déploiement de ChatGPT Shortcut](https://www.aishort.top/fr/docs/deploy).

## Mises à jour synchronisées

Si vous avez déployé votre propre projet sur Vercel en un seul clic, vous pourriez rencontrer un problème où des mises à jour sont constamment indiquées. Cela provient du comportement par défaut de Vercel qui crée un nouveau projet pour vous au lieu de forker le projet actuel, ce qui empêche une détection correcte des mises à jour. Il est recommandé de suivre les étapes suivantes pour un redéploiement :

1. Supprimez le dépôt précédent.
2. Utilisez le bouton "fork" situé dans le coin supérieur droit de la page pour forker le projet actuel.
3. Sur la [page Nouveau Projet de Vercel](https://vercel.com/new), sélectionnez le projet récemment forké dans la section "Import Git Repository" et procédez au déploiement.

### Mises à jour automatiques

> En cas d'erreur lors de l'exécution de l'Upstream Sync, effectuez manuellement un Sync Fork une seule fois.

Une fois que vous avez forké le projet, en raison des restrictions de GitHub, il est nécessaire d'activer manuellement les Workflows sur la page Actions de votre projet forké et d'activer l'action Upstream Sync. Une fois activée, les mises à jour seront exécutées automatiquement quotidiennement.

![Mises à jour automatiques](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Activation des mises à jour automatiques](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Mises à jour manuelles

Pour des mises à jour immédiates, consultez la [documentation de GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) sur la synchronisation des forks.

⭐ Mettez une étoile / 👀 Suivez ce projet ou suivez l'auteur pour être informé des nouvelles fonctionnalités.
