---
sidebar_label: Distribuzione
title: Guida alla Distribuzione AI Short - Vercel, Docker e Cloudflare
description: Distribuisci AI Short facilmente - Supporta Vercel, Docker e Cloudflare. Include guide per configurazione personalizzata e aggiornamenti automatici.
---

# Distribuzione del Progetto

## Configurazione e Personalizzazione

AI Short è un progetto open source che ti permette di modificare liberamente il titolo del sito web, la descrizione, i prompt e altri contenuti in base alle tue esigenze. Di seguito sono riportate le opzioni di modifica comuni e le istruzioni operative:

- **Modificare Titolo e Descrizione del Sito Web**
  Per cambiare il titolo e la descrizione del sito web, modifica il file di configurazione `docusaurus.config.js`.

- **Modificare Istruzioni d'Uso e Introduzione del Progetto**
  Le istruzioni d'uso e i file di introduzione del progetto si trovano nella directory `docs`. Apri i file rilevanti in quella directory per apportare le modifiche necessarie.

- **Modificare i Prompt della Home Page**
  I prompt della home page sono memorizzati nel file `src/data/prompt.json`. Se hai bisogno di modificare i prompt per una lingua specifica, come il cinese, puoi modificare direttamente il file `src/data/prompt_zh.json`. Quando aggiungi un nuovo prompt, il formato è il seguente:

  ```json
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
  ```

  **Nota**: Si raccomanda di impostare l'`id` a 500 o superiore. I nuovi prompt aggiunti non avranno una pagina dedicata né una sezione commenti. Se hai bisogno di aggiungere una pagina dedicata per un prompt, puoi copiare il file modello nella directory `src/data/pages/prompt` per modificarlo.

- **Backend Personalizzato**
  Il progetto attuale è collegato a un sistema backend condiviso. Se desideri costruire il tuo backend, puoi consultare le istruzioni dell'interfaccia nella cartella `src/api`.

  Struttura del modulo API:

  ```
  src/api/
  ├── index.ts       # Ingresso di esportazione unificato
  ├── config.ts      # Configurazione URL API
  ├── client.ts      # Client Axios (inclusi intercettori di autenticazione)
  ├── auth.ts        # API di autenticazione (Login/Registrazione/OAuth)
  ├── prompts.ts     # CRUD Prompt + Ricerca + Voto
  ├── favorites.ts   # Operazioni preferiti
  ├── myspace.ts     # Dati My Space (Fonte dati principale)
  ├── comments.ts    # Sistema di commenti
  └── user.ts        # Informazioni utente
  ```

  **Meccanismo di Cache**: Il progetto utilizza `lscache` combinato con ETag per implementare una cache intelligente. Quando il server restituisce 304 Not Modified, i dati nella cache locale vengono riutilizzati direttamente per ridurre la trasmissione dei dati.

- **Supporto Multilingue e Distribuzione**
  Dopo aver completato le modifiche multilingue, puoi usare lo script `CodeUpdateHandler.py` per l'elaborazione in batch. Esegui il seguente comando:

  ```bash
  python CodeUpdateHandler.py
  ```

  Questo script dividerà il file `prompt.json` secondo regole preimpostate e aggiornerà in modo sincrono la pagina principale e le pagine dei prompt in evidenza per ogni versione linguistica.

## Istruzioni di Distribuzione

Requisiti di Sistema:

- [Node.js 20.0](https://nodejs.org/) o successivo.
- macOS, Windows (incluso WSL) e Linux sono supportati.

### Distribuzione Locale

Assicurati di aver installato [Node.js](https://nodejs.org/).

```shell
# Installazione
yarn

# Sviluppo Locale
yarn start

# Build: Questo comando genera contenuto statico nella directory `build`
yarn build

# Aggiorna il `defaultLocale` nel file `docusaurus.config.js`, poi esegui una build per la lingua desiderata.
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

# Distribuzione per multiple lingue
yarn build --locale zh && yarn build --locale en
```

### Distribuzione su Vercel

Clicca sul pulsante qui sotto per distribuire ChatGPT-Shortcut sulla piattaforma Vercel con un clic:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Nota**: La versione gratuita di Vercel potrebbe segnalare un errore a causa di memoria insufficiente. Se incontri questa situazione, puoi scegliere di distribuire una singola lingua. Le operazioni specifiche sono le seguenti:

1. Entra nel progetto Vercel che hai appena distribuito e apri **Settings**.
2. Nella sezione **Build & Deployment**, trova **Build Command**, poi clicca su **Override** a destra.
3. Modifica il comando di distribuzione. Ad esempio, se devi distribuire la versione cinese, puoi usare `yarn build --locale zh`; se devi distribuire la versione portoghese, usa `yarn build --locale pt`.

### Distribuzione su Cloudflare Pages

Clicca sul pulsante o link qui sotto per fare un Fork di questo progetto, poi segui le istruzioni per distribuire su Cloudflare Pages:

👉 [Fai un Fork di questo progetto](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

Passaggi di Distribuzione:

1. Accedi a [Cloudflare Pages](https://pages.cloudflare.com/) e seleziona **"Create a project"**.
2. Collega il repository che hai appena forkato.
3. Configura i comandi di build:
   - **Build command**: `yarn build --locale zh` (Scegli il locale appropriato in base alla lingua da distribuire, es: per portoghese usa `yarn build --locale pt`).
   - **Output directory**: `build`.
4. Clicca su **Deploy** e attendi che Cloudflare Pages completi la build e la distribuzione.

Cloudflare Pages attiverà anche automaticamente build e distribuzioni ogni volta che invii nuovo codice.

### Distribuzione Docker

Se hai familiarità con Docker, puoi distribuire rapidamente usando il seguente comando:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

In alternativa, puoi anche usare `docker-compose`:

```yml
services:
  chatgpt-shortcut:
    container_name: chatgpt-shortcut
    image: ghcr.io/rockbenben/chatgpt-shortcut:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## Abilitare Aggiornamenti Sincronizzati

Se hai distribuito il tuo progetto su Vercel con un clic, potresti riscontrare un problema dove indica sempre che ci sono aggiornamenti disponibili. Questo perché Vercel crea un nuovo progetto per te di default invece di fare un fork di questo progetto, causando il fallimento del rilevamento degli aggiornamenti. Si raccomanda di ridistribuire seguendo questi passaggi:

1. Elimina il repository originale;
2. Usa il pulsante fork nell'angolo in alto a destra della pagina per fare un fork di questo progetto;
3. Riseleziona il progetto che hai appena forkato nella sezione Import Git Repository della [Pagina Nuovo Progetto Vercel](https://vercel.com/new) e distribuisci.

### Attivare Aggiornamento Automatico

> Se incontri un errore di esecuzione Upstream Sync, per favore esegui manualmente Sync Fork una volta!

Dopo aver forkato il progetto, a causa delle limitazioni di GitHub, devi abilitare manualmente i Workflows nella pagina Actions del tuo progetto forkato e abilitare l'Azione Upstream Sync. Una volta abilitato, gli aggiornamenti verranno eseguiti automaticamente ogni giorno:

![Aggiornamento Automatico](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Abilitare Aggiornamento Automatico](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Aggiornamento Manuale del Codice

Se desideri aggiornare manualmente immediatamente, puoi consultare la [documentazione di GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) per imparare come sincronizzare un progetto forkato con il codice originale.

Puoi mettere una stella (star)/seguire (watch) questo progetto, o seguire l'autore per ricevere notifiche tempestive sui nuovi aggiornamenti delle funzionalità.
