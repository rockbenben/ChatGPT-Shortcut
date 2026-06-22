---
sidebar_label: Distribuzione
title: Guida alla Distribuzione AI Short - Vercel, Docker e Cloudflare
description: Distribuisci AI Short facilmente - Supporta Vercel, Docker e Cloudflare. Include guide per configurazione personalizzata e aggiornamenti automatici.
---

# Distribuzione del Progetto

> **A chi è rivolto**: sviluppatori che vogliono ospitare o personalizzare AiShort. Gli utenti normali possono semplicemente usare [aishort.top](https://www.aishort.top) — non è necessario leggere questa guida.

## Scegli un Modello di Distribuzione

Scegli il modello più adatto alle tue esigenze:

| Modello                          | Backend                                          | Note                                                                                                                                                                                                       |
| -------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Standard** (predefinito)       | Riutilizza il backend condiviso ufficiale        | Dopo il fork puoi personalizzare il nome del sito, la descrizione, i prompt, ecc. (vedi [Configurazione](./deploy/configuration)); login, preferiti, community e sincronizzazione funzionano subito |
| **Edizione Offline**             | Nessun backend, dati memorizzati localmente nel browser | Reti aziendali o governative isolate; non è richiesto alcun account                                                                                                                                        |
| **Backend completamente self-hosted** | Proprio backend indipendente              | Quando hai bisogno di un sistema di account indipendente, piena proprietà dei dati e una community privata                                                                                                  |

I primi due sono trattati in questa guida. Per il terzo, poiché il servizio backend non è open source, [scrivi al developer](mailto:qingwhat@gmail.com) con una breve descrizione del tuo caso d'uso e della scala per ricevere un piano di distribuzione e supporto.

## Documentazione di Distribuzione

Suddivisa nelle seguenti sezioni in base al flusso di distribuzione, consultabili secondo necessità:

- **[Distribuzione Standard](./deploy/standard)** — Riutilizza il backend condiviso ufficiale, con supporto per build locale, Vercel, Cloudflare Pages e Docker.
- **[Deploy Offline](./deploy/offline)** — Soluzione offline per ambienti isolati come intranet aziendali o reti governative, senza backend né account.
- **[Configurazione e Personalizzazione](./deploy/configuration)** — Modifica il titolo del sito, la descrizione, i prompt e collega un backend personalizzato.
- **[Mantenere il Fork Sincronizzato](./deploy/sync-updates)** — Fai seguire al tuo fork gli aggiornamenti upstream automaticamente, evitando di restare indietro.
