<h1 align="center">
⚡️AI Short
</h1>
<p align="center">
    <a href="/README-en.md">English</a> | <a href="/README.md">中文</a> |
<a href="./README-es.md">Español</a> |
<a href="./README-ja.md">日本語</a> |
<a href="./README-ko.md">한국어</a> |
<a href="./README-fr.md">Français</a> |
<a href="./README-de.md">Deutsch</a> |
Italiano |
<a href="./README-ru.md">Русский</a> |
<a href="./README-pt.md">Português</a> |
<a href="./README-ar.md">العربية</a> |
<a href="./README-hi.md">हिन्दी</a> |
<a href="./README-bn.md">বাংলা</a>
</p>
<p align="center">
    <em>ChatGPT Shortcut, Maximize your Efficiency and Productivity</em>
</p>

## Perché usare AiShort?

AiShort offre un elenco conciso e facile da usare di istruzioni AI. Anche senza capire le sollecitazioni, è possibile trovare facilmente le sollecitazioni adatte per vari scenari attraverso la filtrazione e la ricerca, migliorando così la tua produttività.

🚀 **Prompts con un clic**: Con un solo clic, è possibile ottenere una varietà di prompts selezionati attentamente da esperti. Inviale a modelli di linguaggio AI come ChatGPT e potrai ottenere l'output previsto.

💻 **Aumenta la produttività**: Utilizzando prompts ottimizzati, è possibile ottenere feedback più precisi e pratici, migliorando così efficacemente l'efficienza del tuo lavoro.

🌍 **Ottimizzazione per lingue non inglesi**: Forniamo traduzioni per i prompts in inglese in 12 principali lingue globali e supportiamo risposte predefinite nella tua lingua madre, il che è conveniente per i non anglofoni per capire e utilizzare.

💾 **Salva prompts**: Raccogli, modifica e gestisci comodamente i tuoi prompts preferiti per un uso futuro.

🌐 **Condividi prompts**: Condividi i tuoi prompts preferiti, collabora con altri e ispira più idee.

🗳️ **Sistema di votazione della comunità**: Simile a Product Hunt o Reddit, la piattaforma è guidata dalla comunità. I migliori prompts verranno spinti in homepage.

📦 **Pronto all'uso**: Basta visitare https://www.aishort.top/it/ per iniziare a usare.

La fonte dei prompts di AiShort include selezioni Internet, condivisioni della comunità e [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts). Aggiorneremo regolarmente per fornirti nuovi prompts e ispirazione. Per capire come usare AiShort, si prega di fare riferimento al [manuale utente](https://www.aishort.top/it/docs/guides/getting-started).

Benvenuto a unirti alla nostra comunità Discord per scambiare idee e feedback.

<a href="https://discord.gg/PZTQfJ4GjX">
   <img src="https://img.shields.io/discord/1048780149899939881?color=%2385c8c8&label=Discord&logo=discord&style=for-the-badge" alt="chat su Discord" />
</a>

## Estensione del browser

AiShort (ChatGPT Shortcut) è un'estensione versatile compatibile con Chrome, Edge, Firefox e altri browser basati su Chromium. Questa estensione non solo presenta la funzionalità della versione web di ChatGPT Shortcut, ma aggiunge anche caratteristiche uniche come una barra laterale e l'attivazione automatica delle finestre. L'estensione può avviarsi automaticamente con ChatGPT o pagine personalizzate e può anche essere attivata manualmente utilizzando la scorciatoia `Alt+Shift+S`. Ecco i canali di download:

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-shortcut/blcgeoojgdpodnmnhfpohphdhfncblnj)
- **Edge**: [Componenti aggiuntivi Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/chatgpt-shortcut/hnggpalhfjmdhhmgfjpmhlfilnbmjoin)
- **Firefox**: [Componenti aggiuntivi del browser Firefox](https://addons.mozilla.org/addon/chatgpt-shortcut/)
- **GitHub**: [Rilascio GitHub](https://github.com/rockbenben/ChatGPT-Shortcut/releases/latest)

Inoltre, offriamo lo script Tampermonkey - [**Scorciatoia ChatGPT Ovunque**](https://greasyfork.org/scripts/482907-chatgpt-shortcut-anywhere), consentendo agli utenti di personalizzare i nomi di dominio corrispondenti e di utilizzare la barra laterale AiShort su qualsiasi sito Web. Tuttavia, a causa delle restrizioni di iniezione del contenuto dello script nella pagina ChatGPT, la funzionalità della barra laterale dello script viene attivata tramite un popup nella pagina ChatGPT.

## Distribuzione

Per i passaggi dettagliati sulla distribuzione tramite Vercel, ambiente locale, Docker e modifica del progetto, fare riferimento alla [Guida alla distribuzione delle scorciatoie ChatGPT](https://www.aishort.top/it/docs/deploy).

## Aggiornamenti sincronizzati

Se hai distribuito il tuo progetto su Vercel con un solo clic, potresti riscontrare un problema in cui gli aggiornamenti vengono indicati in modo coerente. Ciò deriva dal comportamento predefinito di Vercel di creare un nuovo progetto per te anziché eseguire il fork del progetto corrente, impedendo così il corretto rilevamento degli aggiornamenti. Si consiglia di seguire i passaggi successivi per la ridistribuzione:

1. Rimuovere il repository precedente.
2. Utilizzare il pulsante "fork" situato nell'angolo in alto a destra della pagina per biforcare il progetto corrente.
3. Nella [pagina Nuovo progetto Vercel](https://vercel.com/new), selezionare il progetto recentemente biforcato dalla sezione Importa repository Git e procedere con la distribuzione.

### Aggiornamenti automatici

> In caso di errore durante l'esecuzione di Upstream Sync, eseguire manualmente un singolo Sync Fork.

Dopo aver biforcato il progetto, a causa delle restrizioni di GitHub, è necessario abilitare manualmente i flussi di lavoro nella pagina Azioni del progetto biforcato e attivare l'azione Upstream Sync. Dopo l'attivazione, gli aggiornamenti verranno eseguiti automaticamente su base giornaliera.

![Aggiornamenti automatici](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Abilitazione degli aggiornamenti automatici](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Aggiornamenti manuali

Se desideri effettuare immediatamente l'aggiornamento manuale, puoi fare riferimento alla [documentazione di GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) per scoprire come sincronizzare il progetto forkato con il codice upstream.

Sentiti libero di mostrare supporto per questo progetto assegnandogli una stella/seguendolo, oppure seguendo l'autore, per rimanere informato sulle notifiche tempestive riguardanti i nuovi aggiornamenti delle funzionalità.
