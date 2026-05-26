---
sidebar_label: Deploy Offline
title: Deploy Offline AI Short | Self-hosted per intranet aziendali
description: La versione offline di AI Short è pensata per aziende e team che non possono raggiungere internet pubblica. Niente backend, niente account, i dati restano nel browser — un solo deploy e il team è operativo.
---

# Deploy Offline

> **Destinatari**: amministratori IT o responsabili tecnici incaricati del deploy. Gli utenti finali aprono semplicemente l'URL interno fornito dall'amministratore: non hanno bisogno di leggere questa pagina.

**Quando serve**: intranet aziendali, reti della Pubblica Amministrazione, ambienti sanitari soggetti al GDPR (ospedali, ASL, cliniche), settori regolamentati (banche, assicurazioni, studi legali, difesa), reti universitarie e di ricerca, ambienti air-gapped o classificati, e in generale qualsiasi contesto in cui l'**accesso a internet pubblica è impossibile o vietato dalle policy aziendali**.

Niente backend, niente registrazione: tutti i dati vivono nel browser. Una volta fatto il deploy, i membri del team interno aprono il browser e iniziano a usarlo.

## Come lo usa il team

La versione offline è un sito statico puro. Dopo il deploy su un server interno, i membri del team vi accedono dal browser tramite la rete aziendale:

1. **L'amministratore** fa il deploy della versione offline su un server interno (es. `http://192.168.1.100:3000`)
2. **I membri del team** aprono quell'indirizzo nel browser per sfogliare, cercare e copiare i prompt
3. Le **collezioni e i prompt personalizzati di ciascuno vivono nel proprio browser** — completamente isolati l'uno dall'altro
4. Nessun account, nessun software da installare: si apre e si usa

```
Server interno (versione offline deployata)
   ├── Dati della libreria di prompt (condivisi da tutti, da JSON statico)
   │
   ├── Browser dell'utente A → localStorage (collezioni e prompt di A)
   ├── Browser dell'utente B → localStorage (collezioni e prompt di B)
   └── Browser dell'utente C → localStorage (collezioni e prompt di C)
```

:::tip Suggerimento
La libreria di prompt (prompt curati) è un dato statico incluso in fase di build, quindi tutti gli utenti vedono gli stessi contenuti. Le collezioni, i prompt personalizzati, l'ordinamento e i tag di ciascun utente vengono mantenuti nel localStorage del proprio browser, in modo completamente indipendente.
:::

## Differenze rispetto alla versione online

| Funzionalità | Versione Online | Versione Offline |
| ------------ | --------------- | ---------------- |
| Sfoglia / cerca / filtra prompt | Sì | Sì |
| Copia prompt | Sì | Sì |
| Gestione collezioni | Storage lato server | Storage locale del browser |
| Prompt personalizzati | Storage lato server | Storage locale del browser |
| La Mia Collezione (drag-and-drop, tag) | Sì | Sì |
| Supporto multilingue (18 lingue) | Sì | Sì |
| Import / export dati | Sì | Sì (formati interoperabili) |
| Pagine di dettaglio prompt | Sì | Sì (dati statici, senza commenti) |
| Registrazione / accesso utente | Sì | No (nessun account) |
| Lista prompt community / voti | Sì | No |
| Commenti e feedback | Sì | No |

## Archiviazione dei dati

I dati di ciascun utente sono salvati nel localStorage del **proprio browser**, in modo indipendente da qualsiasi server:

| Dato | Chiave di storage | Descrizione |
| ---- | ----------------- | ----------- |
| Lista collezioni | `local_favorites` | Array degli ID dei prompt collezionati |
| Prompt personalizzati | `local_user_prompts` | Dati dei prompt creati dall'utente |
| Ordine di visualizzazione | `local_myspace_order` | Ordinamento delle schede in La Mia Collezione |
| Tag personalizzati | `local_custom_tags` | Definizioni dei tag e assegnazioni |

:::caution Attenzione
- Il local storage del browser ha un limite di circa 5 MB, più che sufficiente per l'uso quotidiano.
- Cancellare i dati del browser comporta la perdita dei dati personali — invita gli utenti a fare backup regolari da "Impostazioni > Esporta dati".
- Cambiando computer o browser è necessario reimportare i dati.
:::

## Deploy

La versione offline risiede sul branch `offline`. Dopo un singolo deploy iniziale da parte dell'amministratore, i membri del team possono usarla senza ulteriori operazioni.

### Deploy Docker (consigliato)

L'opzione più semplice: un solo comando per avviarla su qualsiasi server interno:

```bash
# Usa l'immagine offline pre-compilata
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# Oppure scarica da Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Una volta fatto il deploy, i membri del team accedono all'indirizzo `http://<ip-server>:3000`.

Con `docker-compose`:

```yml
services:
  aishort-offline:
    container_name: aishort-offline
    image: ghcr.io/rockbenben/chatgpt-shortcut:offline
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Build da sorgente

Se devi personalizzare i contenuti dei prompt o modificare la configurazione:

```bash
# Clona il branch offline
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Installa le dipendenze
yarn

# Sviluppo locale
yarn start

# Build di una singola lingua (italiano)
yarn build --locale it

# Build di tutte le lingue
yarn build
```

L'output della build viene generato nella directory `build/` e può essere servito da qualsiasi web server statico (Nginx, Apache, Caddy, ecc.).

### Esempio di configurazione Nginx

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

### Deploy su piattaforme

Per il deploy su Vercel, Cloudflare Pages o piattaforme simili, basta selezionare il branch `offline`: tutti gli altri passaggi coincidono con la versione online. Vedi [Distribuzione del Progetto](../deploy) per i dettagli.

## Import ed export dati

### Export

Vai in "Impostazioni > Esporta dati" per salvare le tue collezioni e i tuoi prompt personalizzati come file JSON.

### Import

Sono supportati i seguenti formati JSON:

- **File esportati dalla versione offline**: ripristina completamente collezioni, prompt, ordinamento e tag
- **File esportati dalla versione online**: convertiti automaticamente per garantire la compatibilità
  - Prompt utente → uniti in locale (deduplicati per titolo)
  - Collezioni curate (card) → unite alle collezioni locali
  - Collezioni community (community) → convertite automaticamente in prompt personalizzati locali
  - Ordinamento MySpace → ripristinato in locale
  - Tag personalizzati → aggiunti in coda (i tag esistenti non vengono sovrascritti)

### Migrazione dalla versione online

1. Esporta i tuoi dati dalla pagina "Il mio account" sulla versione online (aishort.top)
2. Importa quel file JSON dalla pagina "Impostazioni" sulla versione offline
3. Le collezioni community vengono convertite automaticamente in prompt locali; le collezioni curate si sincronizzano normalmente

## Domande frequenti

### Come usa il team la versione dopo il deploy?

Una volta che l'amministratore ha fatto il deploy su un server interno, basta comunicare al team l'URL di accesso (es. `http://192.168.1.100:3000`). Ognuno lo apre nel browser — niente installazioni, niente account.

### I dati degli utenti possono interferire tra loro?

No. Le collezioni e i prompt personalizzati di ciascuno vivono nel localStorage del proprio browser, in totale isolamento. Sul server c'è solo la libreria di prompt condivisa (in sola lettura).

### I dati possono andare persi?

Le seguenti azioni cancellano i dati personali di un utente:

- Cancellazione dei dati o della cache del browser
- Navigazione in modalità privata / in incognito
- Cambio di computer o di browser

Per i dati importanti raccomandiamo backup regolari su file JSON da "Impostazioni > Esporta dati".

### Si possono condividere i prompt personalizzati nel team?

Sì. Una persona esporta un file JSON e gli altri lo importano da "Impostazioni > Importa dati" — i duplicati vengono gestiti automaticamente.

### Come si aggiorna la libreria di prompt?

La libreria di prompt è un dato statico incluso in fase di build. Per aggiornarla:

1. L'amministratore scarica l'ultimo codice dal branch `offline`
2. Esegue una nuova build e ridistribuisce (oppure scarica l'ultima immagine Docker)
3. I membri del team ricaricano il browser per vedere i nuovi contenuti — i dati personali restano intatti

### Il formato dati della versione offline è compatibile con quella online?

Sì. Il formato JSON esportato è lo stesso e può essere importato in entrambe le direzioni. Gli ID dei prompt differiscono (la versione online usa ID lato server, mentre quella offline usa ID basati su timestamp), ma l'import deduplica per titolo, quindi non ci sono conflitti.
