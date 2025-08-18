# Deploy

AI Short è un progetto open source, puoi modificare liberamente il nome e la descrizione del sito web.

- Per cambiare il nome della pagina, modifica il file `docusaurus.config.js`.
- Per modificare le istruzioni, vai alla directory `docs`.
- Per modificare le parole del prompt, puoi trovarle in `src/data/prompt.json`. Se hai bisogno di modificare solo una lingua, come il cinese, puoi modificare direttamente `src/data/prompt_zh.json`.
- Attualmente, il backend utente è connesso a un sistema backend comune. Se necessario, puoi creare il tuo backend e l'interfaccia pertinente si trova nel file `src/api.js`.

`CodeUpdateHandler.py` è uno script per l'elaborazione batch di distribuzioni multilingua. Dopo aver completato la modifica, esegui `python CodeUpdateHandler.py`, che suddividerà `prompt.json` in più lingue in base alle regole e sincronizzerà il codice della pagina principale di ogni lingua e il codice della pagina indipendente delle parole di prompt selezionate.

## Deployment Instructions

System Requirements:

- [Node.js 18.0](https://nodejs.org/) or later.
- macOS, Windows (including WSL), and Linux are supported.

### Local Deployment

Make sure you have [Node.js](https://nodejs.org/) installed.

```shell
# Installation
yarn

# Local Development
yarn start

# Build: This command generates static content into the `build` directory
yarn build

# Update the `defaultLocale` in the `docusaurus.config.js` file, then perform a build for the desired language.
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

# Deploy for multiple languages
yarn build --locale zh && yarn build --locale en
```

### Vercel Deployment

Click the button below to deploy ChatGPT-Shortcut to the Vercel platform with one click:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fmain)

**Note**: The free tier of Vercel may throw errors due to insufficient memory. In this case, you can choose to deploy a single-language version. The steps are as follows:

1. Go to the Vercel project you just deployed and open **Settings**.
2. Under **Build & Deployment**, find **Build Command**, and then click **Override** on the right.
3. Modify the deployment command. For example, to deploy the Chinese version, use `yarn build --locale zh`; for the Portuguese version, use `yarn build --locale pt`.

## Cloudflare Pages Deployment

Click the button or link below to fork this project, then follow the instructions to deploy it on Cloudflare Pages:

👉 [Fork this project](https://github.com/rockbenben/ChatGPT-Shortcut/fork)

Deployment steps:

1. Log in to [Cloudflare Pages](https://pages.cloudflare.com/) and select **"Create a project"**.
2. Link the repository you just forked.
3. Configure the build command:
   - **Build command**: `yarn build --locale zh` (choose the appropriate locale based on the language to be deployed; for Portuguese, use `yarn build --locale pt`).
   - **Output directory**: `build`.
4. Click **Deploy** and wait for Cloudflare Pages to complete the build and deployment process.

Cloudflare Pages will also automatically trigger a build and deployment every time you push new code.

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
chatgpt-shortcut:
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
