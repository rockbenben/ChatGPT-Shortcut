---
sidebar_label: Versione Offline (Intranet Aziendale)
title: Distribuzione Offline di AI Short | Intranet Aziendale senza Server Esterno
description: La versione offline di AI Short e progettata per aziende e team senza accesso alla rete esterna. Nessun server backend richiesto, nessuna registrazione necessaria, dati archiviati localmente nel browser, pronta all'uso.
---

# Versione di Distribuzione Offline

**Scenari applicabili**: Intranet aziendali, reti governative, ambienti classificati, reti di campus e altri scenari in cui **l'accesso alla rete esterna non e disponibile o e scomodo**.

La versione offline di AI Short non richiede server backend ne registrazione utente. Tutti i dati sono archiviati localmente nel browser. Una volta distribuita, puo essere utilizzata direttamente dai team sulla intranet.

## Utilizzo in Team

La versione offline e un sito web puramente statico. Dopo averla distribuita su un server intranet, i membri del team devono semplicemente aprire l'indirizzo intranet nel loro browser:

1. L'**amministratore** distribuisce la versione offline su un server intranet (es. `http://192.168.1.100:3000`)
2. I **membri del team** aprono l'indirizzo nel browser per sfogliare, cercare e copiare prompt
3. I **preferiti e i prompt personalizzati di ogni persona sono salvati nel proprio browser**, indipendenti l'uno dall'altro
4. Nessuna registrazione richiesta, nessuna installazione software necessaria, pronto all'uso immediatamente

```
Server intranet (versione offline distribuita)
   ├── Dati della libreria prompt (condivisi da tutti, da JSON statico)
   │
   ├── Browser dell'utente A → localStorage (preferiti e prompt personalizzati di A)
   ├── Browser dell'utente B → localStorage (preferiti e prompt personalizzati di B)
   └── Browser dell'utente C → localStorage (preferiti e prompt personalizzati di C)
```

:::tip Nota
Il contenuto della libreria prompt (prompt selezionati) e costituito da dati statici confezionati al momento della build, e tutti gli utenti vedono lo stesso contenuto. I preferiti, i prompt personalizzati, l'ordinamento e i tag di ogni utente sono salvati nel localStorage del proprio browser, completamente indipendenti l'uno dall'altro.
:::

## Differenze dalla Versione Online

| Funzionalita | Versione Online | Versione Offline |
| ---- | ------ | ------ |
| Navigazione/ricerca/filtro prompt | ✅ | ✅ |
| Copia prompt | ✅ | ✅ |
| Gestione preferiti | Archiviazione server | Archiviazione locale browser |
| Prompt personalizzati | Archiviazione server | Archiviazione locale browser |
| La Mia Collezione (ordinamento drag, tag) | ✅ | ✅ |
| Supporto multilingue (18 lingue) | ✅ | ✅ |
| Importazione/esportazione dati | ✅ | ✅ (formato compatibile) |
| Pagine di dettaglio prompt | ✅ | ✅ (dati statici, senza commenti) |
| Registrazione/accesso utente | ✅ | ❌ (nessun account necessario) |
| Lista prompt della community/voto | ✅ | ❌ |
| Feedback commenti | ✅ | ❌ |

## Archiviazione Dati

I dati di ogni utente sono salvati nel localStorage del **proprio browser**, indipendente dal server:

| Dati | Chiave di archiviazione | Descrizione |
| ---- | ------ | ---- |
| Lista preferiti | `local_favorites` | Array di ID prompt preferiti |
| Prompt personalizzati | `local_user_prompts` | Dati prompt creati dall'utente |
| Ordine di classificazione | `local_myspace_order` | Ordinamento schede in La Mia Collezione |
| Tag personalizzati | `local_custom_tags` | Definizioni e assegnazioni tag |

:::caution Attenzione
- L'archiviazione locale del browser ha un limite di capacita di circa 5 MB, piu che sufficiente per l'uso quotidiano.
- La cancellazione dei dati del browser causera la perdita dei dati personali. Si raccomanda di eseguire regolarmente il backup tramite "Impostazioni > Esporta dati".
- I dati devono essere reimportati dopo aver cambiato computer o browser.
:::

## Distribuzione

La versione offline e basata sul branch `offline`. Una volta che l'amministratore completa la distribuzione, i membri del team possono utilizzarla senza passaggi aggiuntivi.

### Distribuzione Docker (Consigliata)

Il metodo di distribuzione piu semplice -- un singolo comando da eseguire sul server intranet:

```bash
# Usare l'immagine offline pre-costruita
docker run -d -p 3000:3000 --name aishort-offline ghcr.io/rockbenben/chatgpt-shortcut:offline

# O usare Docker Hub
docker run -d -p 3000:3000 --name aishort-offline rockben/chatgpt-shortcut:offline
```

Dopo la distribuzione, i membri del team possono accedere a `http://<IP-del-server>:3000`.

Utilizzo di `docker-compose`:

```yml
services:
  aishort-offline:
    container_name: aishort-offline
    image: ghcr.io/rockbenben/chatgpt-shortcut:offline
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Compilare dal Codice Sorgente

Se hai bisogno di personalizzare il contenuto dei prompt o modificare le configurazioni:

```bash
# Clonare il branch offline
git clone -b offline https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut

# Installare le dipendenze
yarn

# Sviluppo locale
yarn start

# Compilare versione monolingua (cinese)
yarn build --locale zh-Hans

# Compilare tutte le lingue
yarn build
```

Il risultato della build si trova nella directory `build/` e puo essere distribuito su qualsiasi server di file statici (Nginx, Apache, Caddy, ecc.).

### Esempio di Configurazione Nginx

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

### Distribuzione su Piattaforma

Quando distribuisci su piattaforme come Vercel o Cloudflare Pages, seleziona il branch `offline`. Tutti gli altri passaggi sono identici alla versione online. Vedi [Distribuzione del Progetto](../deploy) per i dettagli.

## Importazione ed Esportazione Dati

### Esporta

Vai su "Impostazioni > Esporta dati" per esportare i tuoi preferiti personali e prompt personalizzati come file JSON.

### Importa

I seguenti formati di file JSON sono supportati per l'importazione:

- **File esportati dalla versione offline**: Ripristino completo di preferiti, prompt, ordinamento e tag
- **File esportati dalla versione online**: Elaborazione automatica per la compatibilita
  - Prompt utente → Uniti nell'archiviazione locale (deduplicati per titolo)
  - Preferiti selezionati (card) → Uniti nei preferiti locali
  - Preferiti della community (community) → Convertiti automaticamente in prompt personalizzati locali
  - Ordinamento MySpace → Ripristinato nell'archiviazione locale
  - Tag personalizzati → Aggiunti e uniti (non sovrascrive quelli esistenti)

### Migrazione dalla Versione Online

1. Esporta i dati dalla pagina "Il Mio Account" della versione online (aishort.top)
2. Importa il file JSON nella pagina "Impostazioni" della versione offline
3. I preferiti della community saranno automaticamente convertiti in prompt locali, e i preferiti selezionati si sincronizzeranno normalmente

## Domande Frequenti

### Come usa il team dopo la distribuzione?

Dopo che l'amministratore lo distribuisce su un server intranet, basta condividere l'URL di accesso (es. `http://192.168.1.100:3000`) con i membri del team. Ognuno lo apre nel browser -- nessuna installazione, nessuna registrazione necessaria.

### I dati di utenti diversi si influenzano a vicenda?

No. I preferiti e i prompt personalizzati di ogni persona sono salvati nel localStorage del proprio browser, completamente indipendenti. Il server ospita solo la libreria prompt condivisa (sola lettura).

### I dati possono andare persi?

Le seguenti azioni causeranno la perdita dei dati personali:

- Cancellazione dei dati/cache del browser
- Navigazione in modalita privata/incognito
- Cambio di computer o browser

Si raccomanda di eseguire regolarmente il backup dei dati importanti tramite "Impostazioni > Esporta dati" come file JSON.

### I prompt personalizzati possono essere condivisi tra i membri del team?

Si. Una persona esporta il file JSON, e gli altri membri lo importano tramite "Impostazioni > Importa dati". I duplicati vengono rimossi automaticamente durante l'importazione.

### Come aggiornare la libreria prompt?

La libreria prompt e costituita da dati statici confezionati al momento della build. Per aggiornare:

1. L'amministratore ottiene il codice piu recente del branch `offline`
2. Ricompila e ridistribuisce (o scarica l'immagine Docker piu recente)
3. I membri del team aggiornano la pagina del browser per vedere i nuovi contenuti (i dati personali non sono influenzati)

### Il formato dati della versione offline e compatibile con la versione online?

Si. Il formato JSON esportato e identico e puo essere importato tra le due versioni. Gli ID dei prompt differiscono tra le due versioni (la versione online usa ID del server, la versione offline usa ID timestamp), ma la deduplicazione avviene per titolo durante l'importazione, quindi non ci sono conflitti.
