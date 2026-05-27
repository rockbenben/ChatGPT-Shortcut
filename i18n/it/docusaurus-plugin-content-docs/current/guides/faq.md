---
sidebar_label: FAQ
title: "AI Short FAQ | Uso, Ottimizzazione, Uso Commerciale e Privacy"
description: "AiShort è gratuito? I prompt sono multi-modello? Uso commerciale ammesso? Questa guida risponde a 13 domande su uso, ottimizzazione, uso commerciale e privacy dei dati."
---

# FAQ

## AiShort è un generatore di prompt IA?

No. AiShort è una libreria di template di prompt **selezionati e curati manualmente** per scenario, non uno strumento che genera prompt automaticamente con un LLM. Ogni prompt è filtrato e classificato per tag: ti basta copiarlo e incollarlo in qualsiasi strumento di chat IA — ChatGPT, Claude, Gemini, DeepSeek e simili. Se cerchi uno strumento che «genera prompt automaticamente a partire da un'esigenza», PromptPerfect o ChatGPT prompt generator sono un'altra categoria di prodotti.

## AiShort è gratuito? Serve una API Key?

Completamente gratuito, **senza API Key e senza registrazione**. Per sfogliare, cercare e copiare i prompt non serve alcun account.

Con la registrazione sblocchi funzionalità aggiuntive — preferiti con ordinamento drag-and-drop, tag personalizzati, creazione e gestione di prompt privati, condivisione e voto nella community, esportazione dei dati in JSON, sincronizzazione tra dispositivi — anch'esse gratuite. Il codice è completamente open source su [GitHub](https://github.com/rockbenben/ChatGPT-Shortcut).

Nota: AiShort fornisce solo i prompt. **Se l'uso del modello IA in sé è a pagamento dipende dal servizio IA che utilizzi** (per esempio versione gratuita/a pagamento di ChatGPT, fatturazione API, ecc.).

## Quanti prompt ci sono? Quali scenari coprono?

AiShort ospita **5000+ prompt in totale**, organizzati in due librerie:

- **Libreria curata** —— selezionati manualmente, classificati per 25+ tag di scenari, completamente tradotti in 18 lingue. Tag: assistenza alla scrittura, IT/programmazione, articoli/report, SEO/marketing, funzioni aziendali, accademici/insegnanti, istruzione/studenti, lingua/traduzione, psicologia/sociale, allenamento mentale, strumenti di produttività, terminal/interprete, dibattito/discorso, recensione/critica, scienza divertente, enciclopedia della vita, salute medica, consulente finanziario, musica/arte, filosofia/religione, testo/parole, giochi divertenti, consulente professionale, ecc.
- **[Libreria della community](./community)** —— la stragrande maggioranza, contribuita continuamente dagli utenti, ordinabile per popolarità o novità con ricerca; copre scenari più fini e ampi della curata.

Se non trovi nella curata, cerca nella community.

## Quali modelli IA sono supportati? I prompt funzionano su modelli diversi?

I prompt di AiShort sono universali e si adattano a **qualunque scenario IA in cui si possa inserire un prompt** — non solo le pagine di chat, ma anche strumenti di coding come Cursor, chiamate API, agenti IA e altro. Di seguito i modelli conversazionali più comuni:

- Internazionali: ChatGPT, Gemini, Claude, Grok
- Cina continentale: DeepSeek, Tongyi Qianwen, Ernie Bot, Doubao, Kimi, ChatGLM, iFLYTEK Spark, Tencent Yuanbao
- Piattaforme API: OpenRouter, SiliconFlow, Groq

Per l'elenco completo dei modelli vedi [Avvio Rapido → Modelli IA Comuni](./getting-started#modelli-ia-comuni).

**Compatibilità multi-modello**: la grande maggioranza dei prompt testuali funziona trasversalmente — scrittura, traduzione, programmazione, Q&A sono task generici e lo stesso prompt produce risultati validi sui principali LLM. Ogni prompt di AiShort è progettato per default senza dipendenze da un modello specifico. Ma **le prestazioni variano**: per la scrittura Claude tende ad essere più curato nei dettagli, ChatGPT-5 segue le istruzioni più rigorosamente; per la programmazione GPT-5, Gemini Pro e DeepSeek hanno ciascuno punti di forza; per il ragionamento complesso Claude Opus, Gemini Deep Thinking e la serie o-series sono in genere più solidi. I prompt per la generazione di immagini (Midjourney / Stable Diffusion / DALL·E) **non** sono trasferibili: vanno adattati alla sintassi di ciascuno strumento.

## Perché i prompt sono in inglese?

Nel contesto tech italiano l'inglese è già la lingua di lavoro quotidiana (documentazione, ticket, code review), quindi usare prompt in inglese si integra naturalmente nel flusso. In più i modelli IA sono addestrati prevalentemente su corpus in inglese: le istruzioni risultano più precise e gli output più stabili, mentre lo stesso prompt scritto in italiano può dare risultati più variabili tra un'esecuzione e l'altra.

La buona notizia: **prompt in inglese + risposta in italiano funziona benissimo** con ChatGPT, Gemini e Claude.

> 💡 Vuoi una risposta in italiano? Aggiungi `rispondi in italiano` (oppure `respond in Italian`) alla fine del prompt. Entrambe le formulazioni funzionano in modo affidabile sui modelli principali.

## Devo inserire il prompt ogni volta?

**Uso API**: imposta il prompt come `system prompt`, che verrà applicato automaticamente alle conversazioni successive.

**Versione Web**: se non cambi conversazione, ChatGPT ricorderà il prompt corrente. Quando la risposta inizia a deviare, significa che l'IA l'ha «dimenticato»: basta incollarlo di nuovo.

**Suggerimento**: salva le conversazioni che usi spesso come segnalibri del browser per riaprirle al volo.

## Come scelgo il prompt giusto?

Parti dall'output che ti serve e vai a ritroso: per scrivere articoli usa i tag [`write`](/?tags=write) o [`article`](/?tags=article); per scrivere codice [`code`](/?tags=code) o [`interpreter`](/?tags=interpreter); per tradurre [`language`](/?tags=language); per il role-play [`games`](/?tags=games). Se i tag non ti sono familiari, cerca direttamente per parola chiave. Ogni card mostra l'indice di popolarità (numero di copie): i prompt più copiati di solito offrono una qualità più costante.

## Perché non trovo prompt correlati?

L'ambito di ricerca della home page è la **libreria di prompt curati** (più i tuoi prompt personali dopo l'accesso) e **non include** i prompt condivisi nella community.

Se non trovi risultati nella home page usando parole chiave brevi, vai alla pagina [Prompt della Community](./community) e cerca lì: contiene più contenuti condivisi dagli utenti.

## Cosa fare se l'IA fornisce informazioni false?

L'IA a volte produce «allucinazioni», generando informazioni che sembrano plausibili ma in realtà sono errate. Come gestirle:

1. **Verifica le informazioni chiave**: soprattutto dati, citazioni, codice, ecc.
2. **Ottimizzazione a più turni**: chiedi all'IA di controllare e ottimizzare nuovamente la risposta.
3. **Verifica incrociata**: usa prompt o modelli diversi per verificare le conclusioni importanti.

Prompt appropriati possono ridurre le allucinazioni dell'IA.

## Il prompt non rende bene — come lo aggiusto?

Non cambiare subito prompt, parti da queste leve:

1. **Rendi più specifici i `[segnaposto]` tra parentesi quadre** — aggiungi stile, lunghezza, dominio, profilo del lettore e altri dettagli
2. **Chiedi all'IA di iterare**: di fronte a una risposta insoddisfacente chiedi «riscrivilo in modo più X» o «riformulalo in stile Y»; in genere bastano una o due iterazioni per avvicinarsi al risultato, e puoi anche far auto-valutare e migliorare la risposta dall'IA stessa
3. **Confronta modelli diversi**: lo stesso prompt può rendere in modi molto diversi su Claude Sonnet / ChatGPT / Gemini / DeepSeek — Claude tende ad essere più curato nella scrittura, GPT-5 e DeepSeek più stabili nella programmazione
4. **Prova la community**: nei [Prompt della Community](./community) potresti trovare versioni più adatte — e sei benvenuto a condividere i tuoi prompt validi
5. **Feedback e suggerimenti**: hai trovato problemi o hai suggerimenti? Sei benvenuto a inviare un [Feedback](/feedback)

## Come faccio il backup dei miei prompt?

1. Entra in «Il mio account» → trova la sezione «Gestione dati → Esporta prompt»
2. Clicca sul pulsante «Esporta dati»
3. Il sistema genera automaticamente un file JSON da scaricare

Si raccomanda di fare backup regolari per evitare la perdita di dati.

## Posso usare i prompt di AiShort in progetti commerciali?

Sì, ma la licenza dipende dalla fonte:

1. I contenuti da [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts) sono rilasciati in **CC0 (pubblico dominio)**, senza alcuna restrizione
2. I contenuti originali di AiShort e quelli inviati dalla community sono per default in licenza **CC BY-SA 4.0** — uso commerciale, ridistribuzione e adattamento sono ammessi, a patto di mantenere l'attribuzione a AiShort / autore originale e di rilasciare a valle con la stessa apertura
3. Il copyright dei **contenuti IA che generi tramite i prompt** segue i termini d'uso del provider IA che utilizzi (OpenAI / Anthropic / Google ecc.): nella maggior parte dei casi appartiene a te
4. Fanno eccezione le rare card in cui la descrizione del prompt indica esplicitamente «solo uso personale»

## Copiare un prompt rivela i miei dati?

No. I prompt di AiShort sono impacchettati come JSON statico nelle risorse del sito, e **l'azione di copia avviene localmente nella clipboard del tuo browser**.

Quello che **inserisci nei segnaposto tra parentesi quadre e le risposte che l'IA ti fornisce** viaggiano direttamente tra te e la piattaforma IA scelta (ChatGPT / Claude / Gemini / DeepSeek e simili): AiShort non li vede.

Una precisazione: al momento della copia viene inviato al backend un **evento anonimo di conteggio** (POST `/cards/<id>/copy`), usato solo per misurare la popolarità di ciascun prompt (il «numero di copie» mostrato sulla card). **Viene trasmesso solo l'ID della card**: niente contenuto da te inserito, niente dati personali, nessun collegamento all'identità utente.

**Dopo il login**, l'elenco preferiti, i prompt personalizzati e i contributi alla community vengono sincronizzati sul backend per consentire la sincronizzazione tra dispositivi; in qualsiasi momento puoi esportare tutto in JSON o cancellare tutti i tuoi dati con un clic.

## Documentazione Correlata

- [Avvio Rapido](./getting-started) - Metodi di utilizzo base
- [La Mia Collezione](./my-collection) - Gestione collezioni e tag
- [Prompt della Community](./community) - Scoprire e condividere
