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

AiShort fournit une liste concise et facile à utiliser d'instructions AI. Même sans comprendre les invites, vous pouvez facilement trouver les invites adaptées à divers scénarios en filtrant et en cherchant, améliorant ainsi votre productivité.

🚀 **Invitations en un clic** : En un seul clic, vous pouvez obtenir une variété d'invitations soigneusement sélectionnées par des experts. Envoyez-les à des modèles de langage AI comme ChatGPT et vous pouvez obtenir la sortie attendue.

💻 **Augmenter la productivité** : En utilisant des invites optimisées, vous pouvez obtenir des commentaires plus précis et pratiques, améliorant ainsi efficacement votre efficacité de travail.

🌍 **Optimisation pour les langues non anglaises** : Nous fournissons des traductions pour les invitations en anglais dans 12 principales langues mondiales, et prenons en charge les réponses par défaut dans votre langue maternelle, ce qui est pratique pour les locuteurs non anglophones à comprendre et à utiliser.

💾 **Sauvegarder des invites** : Collectez, éditez et gérez facilement vos invitations préférées pour une utilisation future.

🌐 **Partager des invites** : Partagez vos invitations préférées, collaborez avec d'autres, et inspirez plus d'idées.

🗳️ **Système de vote communautaire** : Semblable à Product Hunt ou Reddit, la plateforme est pilotée par la communauté. Les meilleures invitations seront poussées sur la page d'accueil.

📦 **Prêt à l'emploi** : Il suffit de visiter <https://www.aishort.top/fr/> pour commencer à utiliser.

La source des invitations AiShort comprend les sélections sur Internet, les partages de la communauté et [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts). Nous mettrons à jour régulièrement pour vous fournir de nouvelles invitations et de l'inspiration. Pour comprendre comment utiliser AiShort, veuillez vous référer au [manuel de l'utilisateur](https://www.aishort.top/fr/docs/guides/getting-started).

Bienvenue à rejoindre notre communauté Discord pour échanger des idées et des commentaires.

<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="chat on Discord" />
</a>

## Extension de navigateur

L'extension de navigateur AiShort (ChatGPT Shortcut) prend en charge Chrome et Edge avec une fonctionnalité cohérente avec la version web et est régulièrement mise à jour. L'extension peut être déclenchée automatiquement lorsque la page ChatGPT se charge, ou vous pouvez activer la fenêtre de l'extension en appuyant sur la touche de raccourci `Alt+Shift+S`.

<a href="https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj">
  <img src="https://img.newzone.top/2023-06-05-12-28-49.png?imageMogr2/format/webp"  alt="Chrome" valign="middle" /></a>

<a href="https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin">
  <img src="https://img.newzone.top/2023-06-05-12-26-20.png?imageMogr2/format/webp" alt="Edge" valign="middle" /></a>

## Déploiement

### Déployer avec Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

### Installation

```shell
# Installation
yarn

# Développement local
yarn start

# Build : Cette commande génère le contenu statique dans le répertoire `build`
yarn build
```

## Mises à jour synchronisées

Si vous avez déployé votre propre projet sur Vercel en un clic, vous pouvez rencontrer un problème où des mises à jour sont indiquées de manière constante. Cela est dû au comportement par défaut de Vercel qui crée un nouveau projet pour vous au lieu de faire une copie du projet actuel, ce qui empêche la détection appropriée des mises à jour. Il est recommandé de suivre les étapes suivantes pour le redéploiement :

1. Supprimez le dépôt précédent.
2. Utilisez le bouton "fork" situé dans le coin supérieur droit de la page pour faire une copie du projet actuel.
3. Sur la page [Nouveau projet Vercel](https://vercel.com/new), sélectionnez le projet récemment copié à partir de la section Import Git Repository et procédez au déploiement.

### Mises à jour automatiques

> En cas d'erreur lors de l'exécution de la synchronisation amont, effectuez

 manuellement une seule synchronisation de la copie.

Une fois que vous avez fait une copie du projet, en raison des restrictions de GitHub, il est nécessaire d'activer manuellement les workflows sur la page Actions de votre projet copié et d'activer l'action de synchronisation amont. Une fois activée, les mises à jour seront automatiquement exécutées quotidiennement.

![Mises à jour automatiques](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Activation des mises à jour automatiques](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Mises à jour manuelles

Si vous souhaitez effectuer manuellement une mise à jour immédiate, vous pouvez consulter la [documentation de GitHub](https://docs.github.com/fr/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) pour apprendre comment synchroniser le projet copié avec le code amont.

N'hésitez pas à soutenir ce projet en lui donnant une étoile/suivant, ou en suivant l'auteur, pour être informé des notifications en temps opportun concernant les nouvelles fonctionnalités mises à jour.
