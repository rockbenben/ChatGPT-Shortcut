# Extension de navigateur

L'extension AiShort (raccourci ChatGPT) est compatible avec Chrome, Edge, Firefox et d'autres navigateurs basés sur Chromium. Cette extension offre non seulement les fonctionnalités de la version web de ChatGPT, mais ajoute également des fonctionnalités uniques telles que la barre latérale et l'activation automatique de la fenêtre. Cette extension peut être automatiquement lancée avec ChatGPT ou des pages personnalisées, et prend également en charge l'activation manuelle via le raccourci `Alt+Shift+S`. Voici les canaux de téléchargement disponibles :

- **Chrome** : [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge** : [Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Firefox Browser ADD-ONS](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub** : [GitHub Release](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

De plus, nous proposons également un script Greasemonkey - [**ChatGPT Shortcut Anywhere**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere) - qui permet aux utilisateurs de personnaliser les domaines correspondants et d'utiliser la barre latérale AiShort sur n'importe quel site web. Cependant, veuillez noter que, en raison des restrictions d'injection de scripts sur la page ChatGPT, la fonction de barre latérale du script ne fonctionnera que sous forme de fenêtre contextuelle sur la page ChatGPT.

## Options linguistiques

ChatGPT Shortcut prend en charge 13 langues principales, et la langue de l'extension sera automatiquement définie en fonction de votre environnement de navigateur. Les pages intégrées de ChatGPT et la barre latérale suivront également cette configuration. Veuillez noter que, pour éviter les avertissements de permissions sur les sites web tiers, il est recommandé de ne pas changer directement la langue dans les pages intégrées.

![](https://img.newzone.top/2023-12-23-12-04-29.png?imageMogr2/format/webp)

## Paramètres d'affichage

### Barre latérale AiShort

Lorsque la barre latérale AiShort est activée, elle se lancera automatiquement lorsque vous visiterez des sites web spécifiques. Vous pouvez également l'activer manuellement en cliquant sur l'icône verte en bas à droite de la page. Actuellement, la barre latérale est prise en charge sur ChatGPT, Bard, Claude, et 文心一言。

![](https://img.newzone.top/2023-12-23-04-16-15.gif?imageMogr2/format/webp)

Si vous souhaitez utiliser la barre latérale AiShort sur d'autres sites web, veuillez installer le script [ChatGPT Shortcut Anywhere](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere). Veuillez noter que, pour éviter les conflits potentiels avec les fonctionnalités existantes et les éventuels problèmes de compatibilité, le script ChatGPT Shortcut Anywhere ne fonctionnera pas sur les sites web déjà pris en charge par défaut de l'extension.

### Page intégrée

Lorsque la fonction de page intégrée est activée, un bouton de page intégrée AiShort apparaîtra dans le coin supérieur gauche de la version web de ChatGPT. En cliquant dessus, la page d'AiShort prendra la place de l'interface de l'application ChatGPT.

![](https://img.newzone.top/ai/2023-12-22-19-40-15.png?imageMogr2/format/webp)

## Mode de fenêtre autonome

En activant le mode de fenêtre autonome, l'interface de l'extension sera affichée en permanence sous forme de fenêtre indépendante, ce qui facilite la gestion de plusieurs tâches. Vous pouvez configurer les sites web qui activeront automatiquement la fenêtre AiShort dans les paramètres de l'extension.

![](https://img.newzone.top/2023-12-23-12-07-09.png?imageMogr2/format/webp)

### Activation automatique des sites web

Dans les paramètres de l'extension, vous pouvez spécifier quels sites web activeront automatiquement la fenêtre AiShort.

![](https://img.newzone.top/2023-12-23-12-09-51.png?imageMogr2/format/webp)

### Activation par raccourci

Vous pouvez utiliser le raccourci `Alt+Shift+S` pour activer directement la fenêtre AiShort, que ce soit en mode de fenêtre contextuelle ou en mode de fenêtre autonome.

## Problèmes de connexion

### Limitations de la page intégrée de ChatGPT

ChatGPT impose des limitations sur les pages intégrées, notamment l'impossibilité de se connecter via Google. Les utilisateurs doivent se connecter en utilisant leur nom d'utilisateur et leur mot de passe. Si votre compte a été créé via l'authentification Google, vous pouvez réinitialiser votre mot de passe en utilisant la fonction "Mot de passe oublié".

### Avertissement de contenu bloqué

Après vous être connecté avec votre nom d'utilisateur et votre mot de passe, il peut arriver que la page affiche un avertissement indiquant que le contenu est bloqué. Dans ce cas, il suffit généralement de rafraîchir la page pour résoudre le problème et revenir à l'état normal après la connexion.

## Paramètres Firefox

Les paramètres du navigateur Firefox sont relativement complexes, voici donc deux étapes principales pour configurer l'extension :

### 1. Épingler l'extension et accéder aux paramètres

Tout d'abord, dans la barre d'outils de Firefox, sélectionnez "Épingler ChatGPT Shortcut" (Pin to Toolbar), puis accédez au centre des extensions. Sur l'entrée de ChatGPT Shortcut, sélectionnez "Options" (Options) pour accéder aux paramètres de l'extension. Voici comment procéder :

![Paramètres Firefox](https://img.newzone.top/2023-12-25-05-51-47.png?imageMogr2/format/webp)

### 2. Autoriser l'exécution de l'extension

Pour vous assurer que l'extension fonctionne correctement sur des sites web comme ChatGPT, Bard, etc., vous devez faire un clic droit sur l'icône de l'extension sur ces sites web et sélectionner "Toujours autoriser sur ce site" (Always allow on ***). Cette action accorde à l'extension la permission de modifier le contenu et d'ajouter la barre latérale sur les sites web spécifiques.

![Autorisation d'extension Firefox](https://img.newzone.top/2023-12-25-05-59-48.png?imageMogr2/format/webp)
