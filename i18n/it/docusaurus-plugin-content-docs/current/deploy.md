# Deploy

## Deploy con Vercel

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frockbenben%2FChatGPT-Shortcut%2Ftree%2Fgh-pages)

## Installazione

```shell
# Installazione
yarn

# Sviluppo Locale
yarn start

# Build: Questo comando genera il contenuto statico nella directory `build`
yarn build
```

## Aggiornamenti Sincronizzati

Se hai distribuito il tuo progetto su Vercel con un solo clic, potresti incontrare un problema in cui vengono costantemente indicati gli aggiornamenti. Questo problema deriva dal comportamento predefinito di Vercel, che crea un nuovo progetto anziché fare il fork del progetto corrente, impedendo così un corretto rilevamento degli aggiornamenti. Si consiglia di seguire i passaggi successivi per una nuova distribuzione:

1. Rimuovi il repository precedente.
2. Utilizza il pulsante "fork" situato nell'angolo in alto a destra della pagina per fare il fork del progetto corrente.
3. Sulla [pagina Nuovo Progetto di Vercel](https://vercel.com/new), seleziona il progetto appena forkato dalla sezione Importa Repository Git e procedi con la distribuzione.

### Aggiornamenti Automatici

> Nel caso si verifichi un errore durante l'esecuzione della sincronizzazione upstream, eseguire manualmente una sola sincronizzazione del fork.

Una volta che hai fatto il fork del progetto, a causa delle restrizioni di GitHub, è necessario abilitare manualmente le Azioni (Actions) nella pagina delle Actions del progetto forkato e attivare l'azione di sincronizzazione upstream (Upstream Sync). Dopo l'attivazione, gli aggiornamenti verranno eseguiti automaticamente ogni giorno.

![Aggiornamenti Automatici](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Abilitazione Aggiornamenti Automatici](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

### Aggiornamenti Manuali

Se desideri aggiornare manualmente immediatamente, puoi fare riferimento alla [documentazione di GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) per apprendere come sincronizzare il progetto forkato con il codice upstream.

Sentiti libero di mostrare il tuo supporto a questo progetto dando un like/seguendo, oppure seguendo l'autore, per rimanere informato riguardo alle notifiche tempestive relative ai nuovi aggiornamenti delle funzionalità.
