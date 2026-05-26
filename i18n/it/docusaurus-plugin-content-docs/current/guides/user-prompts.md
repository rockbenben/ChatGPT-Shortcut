---
sidebar_label: Prompt Personalizzati
title: Prompt personalizzati AI Short | Crea, modifica e condividi
description: Crea prompt IA personali, salvali nel tuo account personale e richiamali quando vuoi. Supporta la condivisione con la community o l'impostazione come privati e il backup dati con un clic.
---

# Prompt Personalizzati

Dopo l'accesso, puoi creare i tuoi prompt e salvarli nell'account per richiamarli quando vuoi. I prompt personalizzati appariranno nella vista "La Mia Collezione".

## Crea Prompt

1. Clicca sul pulsante "Aggiungi" in alto a destra
2. Nel popup "Crea prompt" che appare, compila il modulo:
   - **Nome del prompt** (obbligatorio): Dai un nome al prompt
   - **Contenuto del prompt** (obbligatorio): Il testo del prompt
   - **Scopo/Uso** (opzionale): Breve descrizione di cosa fa il prompt
   - **Note** (opzionale): Fonte, versioni in altre lingue o annotazioni aggiuntive
3. Lo switch in basso "Vuoi condividere questo prompt nella pagina pubblica?" è attivato per impostazione predefinita — disattivalo per renderlo visibile solo a te
4. Clicca su "Crea prompt" per inviare

![Popup Crea prompt](/img/docs/user-prompts-create.png)

> 💡 **Esempio di compilazione** — un prompt "Assistente per verbali di riunione":
> - **Nome del prompt**: Assistente per verbali di riunione
> - **Contenuto del prompt**: Sei un assistente di redazione professionale. A partire dagli appunti seguenti, redigi un verbale chiaro e sintetico, suddiviso in: partecipanti, ordine del giorno, decisioni prese, azioni assegnate (con responsabile e scadenza). Mantieni un tono formale e neutro. Appunti: [incolla qui gli appunti della riunione]
> - **Scopo/Uso**: Trasformare appunti grezzi in un verbale strutturato pronto da condividere via email
> - **Note**: Utile dopo riunioni di team, comitati o call con clienti

## Modifica Prompt

Nella vista La Mia Collezione, clicca sulla scheda di un prompt che hai creato per aprire il popup "Modifica prompt", dove puoi:

- Modificare nome, contenuto, scopo, note
- Cambiare lo stato di condivisione (pubblico/privato)
- Cliccare su "Salva" per aggiornare

![Interfaccia Modifica Prompt](/img/docs/user-prompts-edit.png)

## Elimina Prompt

Nel popup di modifica clicca su "Elimina". Dopo l'eliminazione non è possibile ripristinare, procedi con cautela.

## Condividi con la Community

Durante la creazione o modifica, lo switch in basso "Vuoi condividere questo prompt nella pagina pubblica?" controlla la visibilità:

- **Attivato (predefinito)**: Il prompt appare nella pagina [Prompt della Community](./community) e altri utenti possono vederlo e collezionarlo
- **Disattivato**: Prompt privato, visibile solo a te

Lo stato di condivisione può essere modificato in qualsiasi momento.

## Esporta Backup

1. Entra in "Il mio account" → trova la sezione "Gestione dati → Esporta prompt"
2. Clicca sul pulsante "Esporta dati"
3. Il sistema genera un file JSON e lo scarica automaticamente

Il contenuto dell'esportazione include:

- Nome del prompt, contenuto, scopo/uso, note
- Ora di creazione e aggiornamento
- Stato di condivisione

Si raccomanda di esportare backup regolarmente per evitare la perdita di dati.

## Importa Prompt

Importa prompt e collezioni da un file JSON:

1. Entra in "Il mio account" → trova la sezione "Gestione dati → Importa prompt"
2. Clicca sul pulsante "Importa dati"
3. Seleziona un file JSON
4. Il sistema unisce automaticamente i dati (deduplicazione per titolo; i prompt con ID di altri utenti vengono automaticamente impostati come privati)

### Collaborazione del Team

Workflow consigliato per condividere prompt all'interno di un team:

1. **Filtra e condividi**: Dopo l'esportazione, rimuovi manualmente l'elenco delle collezioni o filtra i prompt specifici da condividere, poi invia il file ai membri del team per l'importazione
2. **Protezione della privacy**: I prompt importati condivisi da altri (con ID che non appartengono all'account corrente) vengono automaticamente impostati come **privati**, garantendo che i dati dei membri non interferiscano tra loro

## Documentazione Correlata

- [La Mia Collezione](./my-collection) - Gestione collezioni e tag
- [Prompt della Community](./community) - Condivisione e voto
- [Gestione Account](./account) - Accesso e impostazioni
