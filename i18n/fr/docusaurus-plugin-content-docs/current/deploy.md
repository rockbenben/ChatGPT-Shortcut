# Déploiement

## Déployer avec Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

## Installation

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

> En cas d'erreur lors de l'exécution de la synchronisation amont, effectuez manuellement une seule synchronisation de la copie.

Une fois que vous avez fait une copie du projet, en raison des restrictions de GitHub, il est nécessaire d'activer manuellement les workflows sur la page Actions de votre projet copié et d'activer l'action de synchronisation amont. Une fois activée, les mises à jour seront automatiquement exécutées quotidiennement.

![Mises à jour automatiques](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Activation des mises à jour automatiques](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Mises à jour manuelles

Si vous souhaitez effectuer manuellement une mise à jour immédiate, vous pouvez consulter la [documentation de GitHub](https://docs.github.com/fr/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) pour apprendre comment synchroniser le projet copié avec le code amont.

N'hésitez pas à soutenir ce projet en lui donnant une étoile/suivant, ou en suivant l'auteur, pour être informé des notifications en temps opportun concernant les nouvelles fonctionnalités mises à jour.
