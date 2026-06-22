---
sidebar_label: Prompt Personalizzati
title: Prompt personalizzati AI Short | Crea, modifica e condividi
description: Crea prompt IA personali, salvali nel tuo account personale e richiamali quando vuoi. Supporta la condivisione con la community o l'impostazione come privati e il backup dati con un clic.
---

# Prompt Personalizzati

Dopo l'accesso, puoi creare i tuoi prompt e salvarli nell'account per richiamarli quando vuoi. I prompt personalizzati appariranno nella vista "La Mia Collezione".

## Crea Prompt

1. Dopo l'accesso, clicca sul pulsante "**Crea prompt**" in cima alla pagina
2. Compila il dialogo "Crea prompt":
   - **Nome del prompt** (obbligatorio): Un nome per il prompt
   - **Contenuto del prompt** (obbligatorio): Il testo del prompt; il testo tra parentesi quadre `[...]` viene evidenziato come segnaposto al momento della visualizzazione
   - **Utilizzo** (opzionale): Una breve descrizione di cosa fa il prompt
   - **Note** (opzionale): Fonte, versioni in altre lingue o annotazioni aggiuntive
3. Lo switch in basso "**Vuoi condividere questo prompt sulla pagina pubblica?**" è attivato per impostazione predefinita — disattivalo per tenere il prompt privato
4. Clicca su "Crea prompt" per inviare

![Popup Crea prompt](/img/docs/user-prompts-create.png)

> 💡 **Esempio** — un prompt "Generatore di aggiornamenti standup":
> - **Nome del prompt**: Generatore di aggiornamenti standup
> - **Contenuto del prompt**: Sei un assistente di comunicazione sintetico. Trasforma le note seguenti in un aggiornamento giornaliero per lo standup con tre sezioni — Ieri, Oggi, Ostacoli. Mantieni ogni punto breve e orientato al risultato: [le mie note grezze]
> - **Utilizzo**: Converte note disordinate in un aggiornamento standup ordinato
> - **Note**: Da eseguire prima dello standup mattutino

## Modifica Prompt

Nella vista La Mia Collezione, clicca sul pulsante di modifica (matita) sulla scheda di un prompt che hai creato per aprire il dialogo "Modifica Prompt". Puoi:

- Modificare nome, contenuto, utilizzo e note
- Cambiare lo stato di condivisione (pubblico / privato)
- Cliccare su "Salva" per aggiornare

![Interfaccia Modifica Prompt](/img/docs/user-prompts-edit.png)

## Elimina Prompt

Clicca su "Elimina" nel dialogo di modifica. L'eliminazione non può essere annullata — procedi con cautela.

## Condividi con la Community

Durante la creazione o la modifica, lo switch in basso "**Vuoi condividere questo prompt sulla pagina pubblica?**" controlla la visibilità:

- **Attivato (predefinito)**: Il prompt appare nella pagina [Prompt della Community](./community), dove altri utenti possono vederlo e collezionarlo
- **Disattivato**: Privato — visibile solo a te

Lo stato di condivisione può essere modificato in qualsiasi momento.

## Esporta Prompt

1. Vai su "Il mio account" e trova la sezione "Gestione dati → Esporta prompt"
2. Clicca sul pulsante "**Esporta prompt**"
3. Il sistema genera un file JSON e lo scarica automaticamente

Il contenuto esportato include:

- Nome del prompt, contenuto, utilizzo e note
- Stato di condivisione
- Le tue collezioni, l'ordinamento delle collezioni e i tag personalizzati

Si consiglia di esportare backup regolarmente per evitare la perdita di dati.

## Importa Prompt

Importa prompt e collezioni da un file JSON:

1. Vai su "Il mio account" e trova la sezione "Gestione dati → Importa prompt"
2. Clicca sul pulsante "**Importa prompt**"
3. Seleziona un file JSON
4. Il sistema unisce i dati automaticamente (deduplicazione per titolo; i prompt con ID appartenenti a un altro account vengono impostati come privati)

### Collaborazione del Team

Workflow consigliato per condividere prompt all'interno di un team:

1. **Filtra e condividi**: Dopo l'esportazione, rimuovi manualmente l'elenco delle collezioni o filtra i prompt specifici da condividere, poi invia il file ai membri del team per l'importazione
2. **Protezione della privacy**: I prompt importati di proprietà di altri (con ID non appartenenti all'account corrente) vengono automaticamente impostati come **privati**, così i dati di ciascun membro restano separati

## Documentazione Correlata

- [La Mia Collezione](./my-collection) - Gestione collezioni e tag
- [Prompt della Community](./community) - Condivisione e voto
- [Gestione Account](./account) - Accesso e impostazioni
