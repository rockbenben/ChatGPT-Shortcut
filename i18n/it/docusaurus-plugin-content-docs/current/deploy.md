---
sidebar_label: Deploy
title: Guida al Deploy e alla Personalizzazione | Configura AI Short con Facilità
description: Impara come effettuare il deploy e personalizzare rapidamente il tuo progetto AI Short. Questa guida copre Vercel, Cloudflare, Docker e il deploy locale, oltre a come modificare i contenuti e abilitare gli aggiornamenti automatici.
---

# Deploy del Progetto

## Configurazione e Personalizzazione

AI Short è un progetto open-source e puoi modificare liberamente il titolo del sito, la descrizione, i prompt e altro ancora. Di seguito sono riportate le opzioni di personalizzazione più comuni:

- **Modifica il titolo e la descrizione del sito**  
    Aggiorna il file `docusaurus.config.js`.

- **Modifica le istruzioni per l'uso e la documentazione**  
    Tutti i file della documentazione si trovano nella directory `docs`. Apri e modifica il file pertinente secondo necessità.

- **Modifica i prompt della homepage**  
    I prompt della homepage sono memorizzati in `src/data/prompt.json`.  
    Per lingue specifiche (ad es. cinese), modifica `src/data/prompt_zh.json`.  
    Formato di esempio per un nuovo prompt:

`json
  {
    "zh": {
      "title": "custom prompt",
      "prompt": "custom prompt",
      "description": "custom description",
      "remark": "custom mark"
    },
    "website": null,
    "tags": ["music"],
    "id": 500,
    "weight": 1
  }
  `

**Nota**: Usa `id >= 500` per i nuovi prompt. Questi non avranno pagine dedicate o commenti.
Se desideri una pagina dedicata, copia un file modello da `src/data/pages/prompt` e modificalo.

- **Backend personalizzato**
    Il progetto è attualmente collegato a un backend condiviso.
    Per configurare il tuo, controlla i dettagli dell'API in `src/api.js`.

- **Supporto multilingue**
    Dopo aver aggiornato i file di lingua, esegui lo script `CodeUpdateHandler.py` per l'elaborazione batch:

`bash
  python CodeUpdateHandler.py
  `

Questo script dividerà `prompt.json` e sincronizzerà gli aggiornamenti con le pagine dei prompt principali e in primo piano di ogni lingua.

## Guida al Deploy

**Requisiti di sistema**:

- [Node.js 18.0+](https://nodejs.org/)
- macOS, Windows (incluso WSL), o Linux

### Deploy Locale

Assicurati di aver installato [Node.js](https://nodejs.org/).

```bash
# Installa le dipendenze
yarn

# Sviluppo locale
yarn start

# Crea i file statici
yarn build

# Crea per più lingue
yarn build --locale zh
yarn build --locale en
yarn build --locale ja
yarn build --locale ko
yarn build --locale es
yarn build --locale fr
yarn build --locale de
yarn build --locale it
yarn build --locale ru
yarn build --locale pt
yarn build --locale hi
yarn build --locale ar
yarn build --locale bn

# Esempio: crea per due lingue
yarn build --locale zh && yarn build --locale en
```

### Deploy su Vercel

Clicca qui sotto per effettuare il deploy di ChatGPT-Shortcut su Vercel con un solo clic:

[](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Nota**: Il piano gratuito di Vercel potrebbe esaurire la memoria. In tal caso, effettua il deploy di una sola lingua.

Passaggi:

1.  Vai al tuo progetto su Vercel → **Settings**.
2.  Sotto **Build & Deployment**, trova **Build Command** → clicca **Override**.
3.  Imposta il comando di build, ad es.:

- Per il cinese: `yarn build --locale zh`
   - Per il portoghese: `yarn build --locale pt`

### Deploy su Cloudflare Pages

👉 [Fai un fork del repository](https://github.com/rockbenben/ChatGPT-Shortcut/fork), quindi effettua il deploy tramite Cloudflare Pages:

1.  Accedi a [Cloudflare Pages](https://pages.cloudflare.com/), scegli **Create a project**.
2.  Collega il tuo repository forkato.
3.  Configura le impostazioni di build:

- **Build command**: `yarn build --locale zh` (o un'altra lingua)
   - **Output directory**: `build`

4.  Effettua il deploy e attendi il completamento della build.

Cloudflare Pages eseguirà automaticamente un nuovo deploy quando effettui il push di nuovi commit.

### Deploy con Docker

Esegui con Docker:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

O con `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## Abilitare l'Aggiornamento Automatico

Se hai utilizzato il deploy con un clic di Vercel, potresti vedere spesso "aggiornamenti disponibili".
Questo perché Vercel crea un nuovo repository invece di un fork, interrompendo la sincronizzazione.

**Soluzione:**

1.  Elimina il vecchio repository.
2.  Fai un fork di questo progetto direttamente (usa il pulsante fork).
3.  Effettua nuovamente il deploy dal tuo fork tramite la [pagina nuovo progetto Vercel](https://vercel.com/new).

### Aggiornamenti Automatici

> Se vedi errori con **Upstream Sync**, esegui **Sync Fork** manualmente una volta.

Dopo aver effettuato il fork, GitHub richiede di abilitare manualmente i workflow:

- Vai su **Actions** nel tuo fork
- Abilita i workflow, in particolare **Upstream Sync Action**.

Questo verrà eseguito quotidianamente per scaricare gli aggiornamenti dall'upstream.

### Aggiornamenti Manuali

Per aggiornamenti immediati, consulta la [documentazione di GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) sulla sincronizzazione dei fork.

⭐ Metti una stella / 👀 Osserva questo progetto o segui l'autore per ricevere notifiche sulle nuove funzionalità.
