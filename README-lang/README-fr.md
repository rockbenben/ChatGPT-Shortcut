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

📦 **Prêt à l'emploi** : Il suffit de visiter https://www.aishort.top/fr/ pour commencer à utiliser.

La source des invitations AiShort comprend les sélections sur Internet, les partages de la communauté et [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts). Nous mettrons à jour régulièrement pour vous fournir de nouvelles invitations et de l'inspiration. Pour comprendre comment utiliser AiShort, veuillez vous référer au [manuel de l'utilisateur](https://www.aishort.top/fr/docs/guides/getting-started).

Bienvenue à rejoindre notre communauté Discord pour échanger des idées et des commentaires.

<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="chat on Discord" />
</a>

## Extension de navigateur

AiShort (ChatGPT Shortcut) est une extension polyvalente compatible avec Chrome, Edge, Firefox et d'autres navigateurs basés sur Chromium. Cette extension propose non seulement les fonctionnalités de la version Web de ChatGPT Shortcut, mais ajoute également des fonctionnalités uniques telles qu'une barre latérale et l'activation automatique des fenêtres. L'extension peut démarrer automatiquement avec ChatGPT ou des pages personnalisées et peut également être activée manuellement à l'aide du raccourci « Alt+Maj+S ». Voici les canaux de téléchargement :

- **Chrome** : [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge** : [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox** : [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub** : [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

De plus, nous proposons le script Tampermonkey - [**ChatGPT Shortcut [N'importe où**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere), permettant aux utilisateurs de personnaliser les noms de domaine correspondants et d'utiliser la barre latérale AiShort sur n'importe quel site Web. Cependant, en raison des restrictions d'injection de contenu de script sur la page ChatGPT, la fonctionnalité de la barre latérale du script est activée via une fenêtre contextuelle sur la page ChatGPT.

## Déployer

Pour des étapes détaillées sur le déploiement via Vercel, l'environnement local, Docker et la modification du projet, veuillez vous référer au [Guide de déploiement du raccourci ChatGPT](https://www.aishort.top/fr/docs/deploy).

## Mises à jour synchronisées

Si vous avez déployé votre propre projet sur Vercel en un seul clic, vous pouvez rencontrer un problème où les mises à jour sont systématiquement indiquées. Cela découle du comportement par défaut de Vercel qui consiste à créer un nouveau projet pour vous au lieu de dupliquer le projet actuel, ce qui empêche la détection correcte des mises à jour. Il est recommandé de suivre les étapes suivantes pour le redéploiement :

1. Supprimez le référentiel précédent.
2. Utilisez le bouton « fork » situé dans le coin supérieur droit de la page pour forker le projet actuel.
3. Sur la page [Vercel New Project](https://vercel.com/new), sélectionnez le projet récemment forké dans la section Import Git Repository et procédez au déploiement.

### Mises à jour automatiques

> En cas d'erreur lors de l'exécution de la synchronisation en amont, effectuez manuellement un seul fork de synchronisation.

Une fois le projet forké, en raison des restrictions de GitHub, il est nécessaire d'activer manuellement les workflows sur la page Actions de votre projet forké et d'activer l'action de synchronisation en amont. Une fois l'activation effectuée, les mises à jour seront automatiquement exécutées quotidiennement.

![Mises à jour automatiques](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Activation des mises à jour automatiques](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Mises à jour manuelles

Si vous souhaitez effectuer une mise à jour manuelle immédiatement, vous pouvez vous référer à la [documentation de GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) pour savoir comment synchroniser le projet forké avec le code en amont.

N'hésitez pas à montrer votre soutien à ce projet en lui attribuant une étoile/en le suivant, ou en suivant l'auteur, pour rester informé des notifications en temps opportun concernant les nouvelles mises à jour de fonctionnalités.
