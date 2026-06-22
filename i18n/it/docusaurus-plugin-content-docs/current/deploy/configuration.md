---
sidebar_label: Configurazione e Personalizzazione
title: AI Short Configurazione e Personalizzazione | Modifica titolo, prompt, backend personalizzato
description: Personalizza AI Short — modifica il titolo e la descrizione del sito, aggiungi prompt alla homepage, collega un backend personalizzato, con spiegazione della struttura del modulo API e del meccanismo di cache.
---

# Configurazione e Personalizzazione

AI Short è open source — puoi modificare liberamente il titolo del sito, la descrizione, i prompt e altro.

## Titolo e descrizione del sito

Modifica `docusaurus.config.js`.

## Documentazione e guide

Modifica i file corrispondenti nella directory `docs/`.

## Prompt della homepage

I dati sorgente si trovano in `src/data/prompt.json` — un array in cui ogni oggetto contiene tutte le versioni linguistiche indicizzate dal codice lingua (`zh` / `en` / `ja`, ecc.). Il formato per aggiungere un prompt:

```json
{
  "zh": {
    "title": "custom prompt",
    "prompt": "custom prompt",
    "description": "custom description",
    "remark": "custom mark"
  },
  "en": {
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

Dopo la modifica, esegui `python CodeUpdateHandler.py`. Lo script suddivide `prompt.json` in file `prompt_<locale>.json` per lingua e aggiorna la homepage e le pagine dei prompt in evidenza per ogni lingua.

![Pipeline dei dati: il file master prompt.json elaborato da python CodeUpdateHandler.py — suddiviso per lingua in file di prompt per ogni locale, generando il JSON della card e la pagina di dettaglio di ogni id, con conversione OpenCC dal cinese semplificato al tradizionale](/img/docs/data-pipeline.svg)

> **Nota**: imposta `id` a 500 o superiore per evitare conflitti di ID con i prompt esistenti o con i contenuti della community. Eseguendo `python CodeUpdateHandler.py` vengono generati automaticamente i dati delle card e la pagina di dettaglio per ogni prompt (inclusi quelli nuovi), senza bisogno di creare manualmente i file delle pagine; i prompt personalizzati semplicemente non hanno per default una meta descrizione curata né dati dei commenti.

## Backend personalizzato

Per impostazione predefinita il progetto si connette a un backend condiviso (login, preferiti, community, commenti e sincronizzazione tra dispositivi dipendono da esso), e `src/api` documenta il contratto completo dell'interfaccia come riferimento. Il servizio backend stesso non è open source; per una **distribuzione completamente self-hosted con un proprio backend**, vedi [Scegli un Modello di Distribuzione](../deploy#scegli-un-modello-di-distribuzione).

Struttura del modulo API:

```
src/api/
├── index.ts       # unified export entry
├── config.ts      # API URL configuration
├── client.ts      # Axios client (with auth interceptor)
├── auth.ts        # auth API (login/register/OAuth)
├── prompts.ts     # prompt CRUD + search + voting
├── favorites.ts   # favorites operations
├── myspace.ts     # My Space data (core data source)
├── comments.ts    # comment system
└── user.ts        # user info
```

Cache: i dati delle API vengono memorizzati in modo intelligente tramite `lscache` più ETag — quando il server restituisce 304 Not Modified, la cache locale viene riutilizzata per ridurre il trasferimento di dati.
