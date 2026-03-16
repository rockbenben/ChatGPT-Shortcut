---
sidebar_label: Version hors ligne (Intranet d'entreprise)
title: Deploiement hors ligne AI Short | Intranet d'entreprise sans serveur externe
description: La version hors ligne d'AI Short est concue pour les entreprises et les equipes sans acces au reseau externe. Aucun serveur backend requis, aucune inscription necessaire, donnees stockees localement dans le navigateur, pret a l'emploi.
---

# Version de deploiement hors ligne

**Scenarios applicables** : Intranets d'entreprise, reseaux gouvernementaux, environnements classifies, reseaux de campus et autres scenarios ou **l'acces au reseau externe n'est pas disponible ou est peu pratique**.

La version hors ligne d'AI Short ne necessite aucun serveur backend ni inscription d'utilisateur. Toutes les donnees sont stockees localement dans le navigateur. Une fois deployee, elle peut etre utilisee directement par les equipes sur l'intranet.

## Utilisation en equipe

La version hors ligne est un site web purement statique. Apres le deploiement sur un serveur intranet, les membres de l'equipe n'ont qu'a ouvrir l'adresse intranet dans leur navigateur :

1. L'**administrateur** deploie la version hors ligne sur un serveur intranet (ex : `http://192.168.1.100:3000`)
2. Les **membres de l'equipe** ouvrent l'adresse dans leur navigateur pour parcourir, rechercher et copier des prompts
3. Les **favoris et prompts personnalises de chaque personne sont sauvegardes dans son propre navigateur**, independamment les uns des autres
4. Aucune inscription requise, aucune installation de logiciel necessaire, pret a l'emploi immediatement

```
Serveur intranet (version hors ligne deployee)
   ├── Donnees de la bibliotheque de prompts (partagees par tous, depuis le JSON statique)
   │
   ├── Navigateur de l'utilisateur A → localStorage (favoris et prompts personnalises de A)
   ├── Navigateur de l'utilisateur B → localStorage (favoris et prompts personnalises de B)
   └── Navigateur de l'utilisateur C → localStorage (favoris et prompts personnalises de C)
```

:::tip Remarque
Le contenu de la bibliotheque de prompts (prompts selectionnes) est constitue de donnees statiques emballees lors de la construction, et tous les utilisateurs voient le meme contenu. Les favoris, prompts personnalises, le tri et les balises de chaque utilisateur sont sauvegardes dans le localStorage de leur propre navigateur, completement independants les uns des autres.
:::

## Differences avec la version en ligne

| Fonctionnalite | Version en ligne | Version hors ligne |
| ---- | ------ | ------ |
| Navigation/recherche/filtrage de prompts | ✅ | ✅ |
| Copie de prompts | ✅ | ✅ |
| Gestion des favoris | Stockage serveur | Stockage local du navigateur |
| Prompts personnalises | Stockage serveur | Stockage local du navigateur |
| Ma collection (tri par glisser-deposer, balises) | ✅ | ✅ |
| Support multilingue (18 langues) | ✅ | ✅ |
| Import/export de donnees | ✅ | ✅ (format compatible) |
| Pages de detail des prompts | ✅ | ✅ (donnees statiques, sans commentaires) |
| Inscription/connexion utilisateur | ✅ | ❌ (aucun compte necessaire) |
| Liste de prompts communautaires/vote | ✅ | ❌ |
| Retour par commentaires | ✅ | ❌ |

## Stockage des donnees

Les donnees de chaque utilisateur sont sauvegardees dans le localStorage de **son propre navigateur**, independamment du serveur :

| Donnees | Cle de stockage | Description |
| ---- | ------ | ---- |
| Liste des favoris | `local_favorites` | Tableau des IDs de prompts favoris |
| Prompts personnalises | `local_user_prompts` | Donnees de prompts crees par l'utilisateur |
| Ordre de tri | `local_myspace_order` | Tri des cartes dans Ma collection |
| Balises personnalisees | `local_custom_tags` | Definitions et attributions de balises |

:::caution Attention
- Le stockage local du navigateur a une limite de capacite d'environ 5 Mo, ce qui est largement suffisant pour une utilisation quotidienne.
- La suppression des donnees du navigateur entrainera la perte des donnees personnelles. Il est recommande de sauvegarder regulierement via « Parametres > Exporter les donnees ».
- Les donnees doivent etre reimportees apres un changement d'ordinateur ou de navigateur.
:::

## Deploiement

La version hors ligne est basee sur la branche `offline`. Une fois que l'administrateur a termine le deploiement, les membres de l'equipe peuvent l'utiliser sans aucune etape supplementaire.

### Deploiement Docker (Recommande)

La methode de deploiement la plus simple -- une seule commande a executer sur votre serveur intranet :

```bash
# Utiliser l'image hors ligne pre-construite
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Ou utiliser Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Apres le deploiement, les membres de l'equipe peuvent acceder a `http://<IP-du-serveur>:3000`.

Utilisation de `docker-compose` :

```yml
services:
  aishort-offline:
    container_name: aishort-offline
    image: ghcr.io/rockbenben/chatgpt-shortcut:offline
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Construction a partir du code source

Si vous devez personnaliser le contenu des prompts ou modifier les configurations :

```bash
# Cloner la branche hors ligne
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Installer les dependances
yarn

# Developpement local
yarn start

# Construire la version monolingue (chinois)
yarn build --locale zh-Hans

# Construire toutes les langues
yarn build
```

Le resultat de la construction se trouve dans le repertoire `build/` et peut etre deploye sur n'importe quel serveur de fichiers statiques (Nginx, Apache, Caddy, etc.).

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

### Deploiement sur plateforme

Lors du deploiement sur des plateformes comme Vercel ou Cloudflare Pages, selectionnez la branche `offline`. Toutes les autres etapes sont identiques a la version en ligne. Voir [Deploiement du projet](../deploy) pour plus de details.

## Import et export de donnees

### Export

Allez dans « Parametres > Exporter les donnees » pour exporter vos favoris personnels et prompts personnalises sous forme de fichier JSON.

### Import

Les formats de fichiers JSON suivants sont pris en charge pour l'import :

- **Fichiers exportes depuis la version hors ligne** : Restauration complete des favoris, prompts, tri et balises
- **Fichiers exportes depuis la version en ligne** : Traitement automatique pour la compatibilite
  - Prompts utilisateur → Fusionnes dans le stockage local (dedupliques par titre)
  - Favoris selectionnes (card) → Fusionnes dans les favoris locaux
  - Favoris communautaires (community) → Automatiquement convertis en prompts personnalises locaux
  - Tri MySpace → Restaure dans le stockage local
  - Balises personnalisees → Ajoutees et fusionnees (n'ecrase pas les existantes)

### Migration depuis la version en ligne

1. Exportez les donnees depuis la page « Mon compte » de la version en ligne (aishort.top)
2. Importez le fichier JSON sur la page « Parametres » de la version hors ligne
3. Les favoris communautaires seront automatiquement convertis en prompts locaux, et les favoris selectionnes se synchroniseront normalement

## FAQ

### Comment l'equipe l'utilise-t-elle apres le deploiement ?

Apres que l'administrateur l'a deploye sur un serveur intranet, partagez simplement l'URL d'acces (ex : `http://192.168.1.100:3000`) avec les membres de l'equipe. Chacun l'ouvre dans son navigateur -- aucune installation, aucune inscription necessaire.

### Les donnees des differents utilisateurs s'affectent-elles mutuellement ?

Non. Les favoris et prompts personnalises de chaque personne sont sauvegardes dans le localStorage de son propre navigateur, completement independants. Le serveur n'heberge que la bibliotheque de prompts partagee (en lecture seule).

### Les donnees peuvent-elles etre perdues ?

Les actions suivantes entraineront la perte des donnees personnelles :

- Suppression des donnees/cache du navigateur
- Navigation en mode prive/incognito
- Changement d'ordinateur ou de navigateur

Il est recommande de sauvegarder regulierement les donnees importantes via « Parametres > Exporter les donnees » sous forme de fichier JSON.

### Les prompts personnalises peuvent-ils etre partages entre les membres de l'equipe ?

Oui. Une personne exporte le fichier JSON, et les autres membres l'importent via « Parametres > Importer les donnees ». Les doublons sont automatiquement supprimes lors de l'import.

### Comment mettre a jour la bibliotheque de prompts ?

La bibliotheque de prompts est constituee de donnees statiques emballees lors de la construction. Pour mettre a jour :

1. L'administrateur recupere le dernier code de la branche `offline`
2. Reconstruit et redeploit (ou recupere la derniere image Docker)
3. Les membres de l'equipe actualisent la page du navigateur pour voir le nouveau contenu (les donnees personnelles ne sont pas affectees)

### Le format de donnees de la version hors ligne est-il compatible avec la version en ligne ?

Oui. Le format JSON exporte est identique et peut etre importe entre les deux versions. Les IDs de prompts different entre les deux versions (la version en ligne utilise des IDs serveur, la version hors ligne utilise des IDs horodatage), mais la deduplication se fait par titre lors de l'import, il n'y a donc pas de conflit.
