---
sidebar_label: Version hors ligne (intranet d'entreprise)
title: Déploiement hors ligne AI Short | Intranet d'entreprise sans serveur externe
description: La version hors ligne d'AI Short est conçue pour les entreprises et les équipes qui ne peuvent pas accéder à Internet. Pas de serveur backend, pas d'inscription, données stockées localement dans le navigateur, prêt à l'emploi.
---

# Version déploiement hors ligne

> **Public visé**&nbsp;: administrateurs informatiques ou responsables techniques chargés du déploiement. Les utilisateurs finaux n'ont qu'à se rendre sur l'adresse intranet préparée par l'administrateur — ils n'ont pas besoin de lire ce document.

**Cas d'usage**&nbsp;: intranets d'entreprise, secteur public et administrations, environnements sensibles soumis au RGPD, réseaux universitaires, et tout autre contexte où **l'accès à Internet est impossible ou déconseillé**.

Pas de backend, pas d'inscription — toutes les données restent dans le navigateur. Une fois le déploiement effectué, les membres de l'équipe ouvrent simplement leur navigateur pour utiliser l'outil sur le réseau interne.

## Mode d'emploi pour l'équipe

La version hors ligne est un site statique pur. Une fois déployée sur un serveur intranet, les utilisateurs y accèdent depuis leur navigateur&nbsp;:

1. **L'administrateur** déploie la version hors ligne sur un serveur intranet (par exemple `http://192.168.1.100:3000`)
2. **Les membres de l'équipe** ouvrent cette adresse dans leur navigateur pour parcourir, rechercher et copier des prompts
3. Les **favoris et prompts personnalisés de chaque utilisateur sont enregistrés dans son propre navigateur** — aucune interférence entre les utilisateurs
4. Aucune inscription, aucune installation logicielle&nbsp;: il suffit d'ouvrir la page

```
Serveur intranet (déploiement de la version hors ligne)
   ├── Bibliothèque de prompts (partagée par tous, issue d'un JSON statique)
   │
   ├── Navigateur de l'utilisateur A → localStorage (favoris et prompts de A)
   ├── Navigateur de l'utilisateur B → localStorage (favoris et prompts de B)
   └── Navigateur de l'utilisateur C → localStorage (favoris et prompts de C)
```

:::tip Bon à savoir
La bibliothèque de prompts (prompts sélectionnés) est embarquée comme donnée statique au moment du build&nbsp;: tous les utilisateurs voient exactement le même contenu. Les favoris, prompts personnalisés, ordre d'affichage et balises de chacun restent dans le localStorage de son propre navigateur, totalement indépendants.
:::

## Différences avec la version en ligne

| Fonctionnalité | Version en ligne | Version hors ligne |
| ---- | ------ | ------ |
| Parcours / recherche / filtrage de prompts | ✅ | ✅ |
| Copie de prompts | ✅ | ✅ |
| Gestion des favoris | Stockage serveur | Stockage local du navigateur |
| Prompts personnalisés | Stockage serveur | Stockage local du navigateur |
| Ma collection (glisser-déposer, balises) | ✅ | ✅ |
| Support multilingue (18 langues) | ✅ | ✅ |
| Import / export de données | ✅ | ✅ (formats compatibles) |
| Page de détail d'un prompt | ✅ | ✅ (données statiques, sans commentaires) |
| Inscription / connexion utilisateur | ✅ | ❌ (aucun compte requis) |
| Liste / vote des prompts communautaires | ✅ | ❌ |
| Commentaires et retours | ✅ | ❌ |

## Stockage des données

Les données de chaque utilisateur sont enregistrées dans le localStorage **de son propre navigateur**, sans aucun lien avec un serveur&nbsp;:

| Donnée | Clé de stockage | Description |
| ---- | ------ | ---- |
| Liste des favoris | `local_favorites` | Tableau des identifiants de prompts favoris |
| Prompts personnalisés | `local_user_prompts` | Données des prompts créés par l'utilisateur |
| Ordre d'affichage | `local_myspace_order` | Ordre des cartes dans Ma collection |
| Balises personnalisées | `local_custom_tags` | Définition et affectation des balises |

:::caution Attention
- Le stockage local du navigateur est plafonné à environ 5&nbsp;Mo, ce qui suffit largement à un usage courant.
- Effacer les données du navigateur entraîne la perte des données personnelles — il est recommandé de sauvegarder régulièrement via «&nbsp;Paramètres > Exporter les données&nbsp;».
- En cas de changement d'ordinateur ou de navigateur, les données doivent être réimportées.
:::

## Déploiement

La version hors ligne est basée sur la branche `offline`. Une fois le déploiement initial réalisé par l'administrateur, les membres de l'équipe n'ont plus aucune action à entreprendre.

### Déploiement Docker (recommandé)

La méthode la plus simple&nbsp;: une seule commande pour faire tourner l'outil sur un serveur intranet.

```bash
# Utiliser l'image préconstruite de la version hors ligne
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Ou utiliser Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Une fois déployé, les membres de l'équipe accèdent à `http://<IP-du-serveur>:3000`.

Avec `docker-compose`&nbsp;:

```yml
services:
  aishort-offline:
    container_name: aishort-offline
    image: ghcr.io/rockbenben/chatgpt-shortcut:offline
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Construction depuis les sources

Si vous souhaitez personnaliser le contenu des prompts ou modifier la configuration&nbsp;:

```bash
# Cloner la branche hors ligne
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Installer les dépendances
yarn

# Développement local
yarn start

# Construire une version monolingue (français)
yarn build --locale fr

# Construire toutes les langues
yarn build
```

Les fichiers générés se trouvent dans le répertoire `build/` et peuvent être déployés sur n'importe quel serveur de fichiers statiques (Nginx, Apache, Caddy, etc.).

### Exemple de configuration Nginx

```nginx
server {
    listen 3000;
    server_name _;
    root /path/to/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Déploiement sur des plateformes

Pour Vercel, Cloudflare Pages et autres plateformes équivalentes, sélectionnez simplement la branche `offline`&nbsp;; le reste de la procédure est identique à la version en ligne, voir [Déploiement du projet](../deploy).

## Import et export de données

### Export

Rendez-vous dans «&nbsp;Paramètres > Exporter les données&nbsp;» pour exporter vos favoris personnels et vos prompts personnalisés sous forme de fichier JSON.

### Import

Les formats de fichier JSON suivants sont pris en charge&nbsp;:

- **Fichier exporté depuis la version hors ligne**&nbsp;: restauration complète des favoris, prompts, ordre d'affichage et balises
- **Fichier exporté depuis la version en ligne**&nbsp;: compatibilité automatique
  - Prompts utilisateur → fusionnés en local (déduplication par titre)
  - Favoris sélectionnés (card) → fusionnés dans les favoris locaux
  - Favoris communautaires (community) → convertis automatiquement en prompts personnalisés locaux
  - Tri MySpace → restauré en local
  - Balises personnalisées → ajoutées par fusion (sans écraser les existantes)

### Migration depuis la version en ligne

1. Sur la version en ligne (aishort.top), exportez vos données depuis la page «&nbsp;Mon Compte&nbsp;»
2. Sur la version hors ligne, importez ce fichier JSON depuis la page «&nbsp;Paramètres&nbsp;»
3. Les favoris communautaires deviennent automatiquement des prompts locaux&nbsp;; les favoris sélectionnés sont synchronisés normalement

## Questions fréquentes

### Comment l'équipe utilise-t-elle l'outil après le déploiement&nbsp;?

L'administrateur déploie sur un serveur intranet, puis communique l'adresse d'accès (par exemple `http://192.168.1.100:3000`) aux membres de l'équipe. Chacun ouvre l'adresse dans son navigateur, sans installation ni inscription.

### Les données des utilisateurs interfèrent-elles entre elles&nbsp;?

Non. Les favoris et les prompts personnalisés de chaque utilisateur sont enregistrés dans le localStorage de son propre navigateur, en totale indépendance. Seule la bibliothèque de prompts partagée (en lecture seule) réside sur le serveur.

### Les données peuvent-elles être perdues&nbsp;?

Les opérations suivantes entraînent la perte des données personnelles&nbsp;:

- Effacement des données ou du cache du navigateur
- Navigation en mode privé / incognito
- Changement d'ordinateur ou de navigateur

Il est recommandé de sauvegarder régulièrement les données importantes au format JSON via «&nbsp;Paramètres > Exporter les données&nbsp;».

### Peut-on partager des prompts personnalisés au sein de l'équipe&nbsp;?

Oui. Un utilisateur exporte son fichier JSON, les autres membres l'importent via «&nbsp;Paramètres > Importer les données&nbsp;»&nbsp;; la déduplication est automatique.

### Comment mettre à jour la bibliothèque de prompts&nbsp;?

La bibliothèque de prompts est embarquée comme donnée statique au moment du build. Pour la mettre à jour&nbsp;:

1. L'administrateur récupère la dernière version de la branche `offline`
2. Reconstruire et redéployer (ou récupérer la dernière image Docker)
3. Les membres de l'équipe rafraîchissent leur navigateur pour voir le nouveau contenu (leurs données personnelles ne sont pas affectées)

### Le format de données de la version hors ligne est-il compatible avec la version en ligne&nbsp;?

Oui. Le format JSON exporté est identique et les fichiers peuvent être importés d'une version à l'autre. Les identifiants de prompts diffèrent (la version en ligne utilise un ID serveur, la version hors ligne un ID basé sur l'horodatage), mais l'import déduplique par titre&nbsp;: aucun conflit n'est possible.
