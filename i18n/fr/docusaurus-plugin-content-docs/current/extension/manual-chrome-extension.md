---
sidebar_label: Guide d'installation CRX pour Chrome
title: Installation Chrome CRX AI Short | Mode développeur manuel
description: Installez manuellement l'extension AI Short via un fichier CRX : activez le mode développeur, puis glissez-déposez. Solutions aux problèmes courants incluses.
---

# Guide d'installation locale de l'extension CRX pour Chrome

> Ce tutoriel suppose que vous avez déjà téléchargé et décompressé le paquet CRX depuis la [page d'installation](./README.md) (le fichier .crx se trouve dans le dossier décompressé).
>
> ⚠️ **Deux pièges courants** :
> 1. Vous devez glisser le **fichier `.crx`** (issu de la décompression) dans la page des extensions — pas le paquet zip lui-même
> 2. Vous devez **glisser-déposer** — ne cliquez pas sur "Charger l'extension non empaquetée" (ce bouton sert à la version zip)

## Activer le mode développeur

Ouvrez la page "Gérer les extensions" de Chrome et activez le "Mode développeur".

Copiez l'adresse ci-dessous et collez-la dans la barre d'adresse du navigateur, puis appuyez sur Entrée. Activez ensuite le "Mode développeur" en haut à droite de la page.

```txt
chrome://extensions
```

![](https://img.newzone.top/2024-08-12-22-05-52.png?imageMogr2/format/webp)

## Installer l'extension

Installez l'extension ChatGPT Shortcut (attention ⚠️ : glissez le fichier .crx, ne cliquez PAS sur "Charger l'extension non empaquetée")

![](https://img.newzone.top/2024-08-12-22-16-38.png?imageMogr2/format/webp)

Après une installation réussie, vous pouvez consulter le [Tutoriel d'utilisation de l'extension](./usage.md).

## Problèmes d'installation ?

1. Utilisateurs Windows : avez-vous décompressé le paquet d'installation téléchargé (au lieu de double-cliquer pour l'ouvrir) ?

2. Le "Mode développeur" est-il activé ? Sinon, référez-vous à l'étape précédente.

3. Avez-vous bien glissé le fichier crx dans la page "Extensions" ? Attention ⚠️ : ne cliquez pas sur "Charger l'extension non empaquetée", vous devez glisser le fichier crx.

4. Le navigateur n'autorise pas l'installation de fichiers crx ? Essayez d'installer le fichier zip ! [Cliquez ici pour voir le tutoriel d'installation ZIP](./manual-chrome-extension-zip.md).
