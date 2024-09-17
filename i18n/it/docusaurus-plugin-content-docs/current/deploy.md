# Deploy

AI Short è un progetto open source, puoi modificare liberamente il nome e la descrizione del sito web.

- Per cambiare il nome della pagina, modifica il file `docusaurus.config.js`.
- Per modificare le istruzioni, vai alla directory `docs`.
- Per modificare le parole del prompt, puoi trovarle in `src/data/prompt.json`. Se hai bisogno di modificare solo una lingua, come il cinese, puoi modificare direttamente `src/data/prompt_zh.json`.
- Attualmente, il backend utente è connesso a un sistema backend comune. Se necessario, puoi creare il tuo backend e l'interfaccia pertinente si trova nel file `src/api.js`.

`CodeUpdateHandler.py` è uno script per l'elaborazione batch di distribuzioni multilingua. Dopo aver completato la modifica, esegui `python CodeUpdateHandler.py`, che suddividerà `prompt.json` in più lingue in base alle regole e sincronizzerà il codice della pagina principale di ogni lingua e il codice della pagina indipendente delle parole di prompt selezionate.

## Distribuzione

### Distribuzione con Vercel

Clicca sul pulsante qui sotto per distribuire ChatGPT-Shortcut sulla piattaforma Vercel con un clic:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

Con Vercel, puoi ospitare rapidamente il tuo progetto e gestire automaticamente build e distribuzioni, il che è adatto per gli utenti che non hanno requisiti di configurazione del server complessi.

### Distribuzione locale

Assicurati di aver installato [Node.js](https://nodejs.org/).

```shell
# Installazione
yarn

# Sviluppo locale
yarn start

# Build: questo comando genera contenuto statico nella directory `build`
yarn build

# Aggiorna `defaultLocale` nel file `docusaurus.config.js`, quindi esegui una build per la lingua desiderata. yarn build --locale zh
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

# Distribuzione per più lingue
yarn build --locale zh && yarn build --locale en
```

### Distribuzione Docker

Se hai familiarità con Docker, puoi distribuire rapidamente con il seguente comando:

```bash
# ghcr.io
docker run -d -p 3000:3000 --name chatgpt-shortcut ghcr.io/rockbenben/chatgpt-shortcut:latest

# docker hub
docker run -d -p 3000:3000 --name chatgpt-shortcut rockben/chatgpt-shortcut:latest
```

In alternativa, puoi usare `docker-compose`:

```yml
version: "3.8"

services:
docsify:
container_name: chatgpt-shortcut
image: ghcr.io/rockbenben/chatgpt-shortcut:latest
ports:
- "3000:3000"
restart: unless-stopped
```

## Aggiornamenti sincronizzati

Se hai distribuito il tuo progetto su Vercel con un solo clic, potresti riscontrare un problema in cui gli aggiornamenti vengono indicati in modo coerente. Ciò deriva dal comportamento predefinito di Vercel di creare un nuovo progetto per te anziché effettuare il fork del progetto corrente, impedendo così il corretto rilevamento degli aggiornamenti. Si consiglia di seguire i passaggi successivi per la ridistribuzione:

1. Rimuovi il repository precedente.
2. Utilizza il pulsante "fork" situato nell'angolo in alto a destra della pagina per forkare il progetto corrente.
3. Nella [pagina Nuovo progetto Vercel](https://vercel.com/new), seleziona il progetto forkato di recente dalla sezione Importa repository Git e procedi con la distribuzione.

### Aggiornamenti automatici

> In caso di errore durante l'esecuzione di Upstream Sync, esegui manualmente un singolo Sync Fork.

Dopo aver forkato il progetto, a causa delle restrizioni di GitHub, è necessario abilitare manualmente i flussi di lavoro nella pagina Azioni del progetto forkato e attivare l'azione Upstream Sync. Dopo l'attivazione, gli aggiornamenti verranno eseguiti automaticamente ogni giorno.

![Aggiornamenti automatici](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Abilitazione degli aggiornamenti automatici](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Aggiornamenti manuali

Se desideri effettuare immediatamente l'aggiornamento manuale, puoi fare riferimento alla [documentazione di GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) per scoprire come sincronizzare il progetto forkato con il codice upstream.

Sentiti libero di mostrare supporto per questo progetto assegnandogli una stella/seguendolo, oppure seguendo l'autore, per rimanere informato sulle notifiche tempestive riguardanti i nuovi aggiornamenti delle funzionalità.
