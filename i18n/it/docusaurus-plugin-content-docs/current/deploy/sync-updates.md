---
sidebar_label: Mantenere il Fork Sincronizzato
title: AI Short Sincronizzazione | Fork che segue automaticamente l'upstream
description: Fai seguire al tuo fork di AI Short gli aggiornamenti upstream automaticamente — risolvi il problema del deploy Vercel che non rileva gli aggiornamenti e attiva la sincronizzazione automatica con GitHub Actions.
---

# Mantenere il Fork Sincronizzato

Una distribuzione Vercel con un clic potrebbe continuare a mostrare un messaggio di "aggiornamento disponibile" — perché Vercel crea un nuovo progetto anziché un fork, quindi non riesce a rilevare gli aggiornamenti upstream. Per risolvere:

1. Elimina il repository originale
2. Usa il pulsante **Fork** in alto a destra della pagina per fare il fork di questo progetto
3. Nella [pagina nuovo progetto Vercel](https://vercel.com/new), reimporta il repository forkato in Import Git Repository e distribuisci

## Attivare l'Aggiornamento Automatico

> Se riscontri un errore di Upstream Sync, esegui Sync Fork manualmente una volta!

Dopo il fork, abilita manualmente i Workflow nella pagina Actions e avvia l'azione Upstream Sync una volta. Una volta attivato, il progetto si sincronizza automaticamente ogni giorno:

![Aggiornamento Automatico](https://img.newzone.top/2023-05-19-11-57-59.png?imageMogr2/format/webp)

![Abilitare Aggiornamento Automatico](https://img.newzone.top/2023-05-19-11-59-26.png?imageMogr2/format/webp)

## Aggiornamento Manuale

Vuoi aggiornare subito a mano? Consulta la [documentazione di GitHub sulla sincronizzazione dei fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

Puoi anche mettere una stella / seguire questo progetto per ricevere notifiche sulle nuove funzionalità.
