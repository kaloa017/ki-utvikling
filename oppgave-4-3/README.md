# Oppgave 4.3 – Sky mot lokal

## Forsøk

De samme tre instruksene ble brukt mot:

- **Skymodell:** GPT-5.6 Luna, modell-ID `gpt-5.6-luna`.
- **Lokal modell:** Ollama `qwen3.5:9b`, 9.0B, Q4_K_M, kjørt med Ollama `0.40.16`.

Skyløsningene ligger under `sky/`, og lokalløsningene ligger under `lokal/`.
Ingen av løsningene ble kopiert mellom modellmappene.

Den lokale modellen fikk i tillegg denne arbeidsinstruksen for ressursbruk:
«Utfør én oppgave om gangen. Unngå unødvendig lange svar og forklaringer.
Ikke les filer eller mapper flere ganger uten grunn. Ikke generer store mengder
kode når små endringer er tilstrekkelig. Unngå unødvendige terminalkommandoer
og gjentatte tester. Ikke start flere prosesser eller modellinstanser parallelt.
Bruk eksisterende prosjektstruktur og gjenbruk fungerende kode. Hold konteksten
så liten og relevant som mulig. Ikke utfør unødvendig research eller analyse.»
Dette er dokumentert fordi det gjør sammenligningen litt mindre strikt enn kun
de tre ordrette oppgaveinstruksene.

## Testgrunnlag

De ordrette oppgaveinstruksene var:

1. «Lag et enkelt program som spør brukeren om et tall og undersøker om tallet
   er partall eller oddetall. Programmet skal håndtere ugyldig input på en
   fornuftig måte. Hold koden ryddig og lett å forstå.»
2. «Lag et program som spør brukeren om en verdi T og finner det T-te primtallet.
   Programmet skal fungere for større verdier av T, bruke en fornuftig algoritme
   og håndtere ugyldig input. Forklar kort hvordan løsningen fungerer.»
3. «Lag en enkel og moderne quiz-nettside med minst 10 spørsmål og 4
   svaralternativer per spørsmål. Brukeren skal kunne velge svar og trykke på
   en knapp kalt "Sjekk" for å kontrollere svarene. Etterpå skal nettsiden vise
   hvilke svar som var riktige, hvilke som var feil, og samlet poengsum. Designet
   skal være ryddig og fungere både på mobil og PC.»

## Sammenligning

| Kriterium | Skymodell | Lokal modell |
|---|---|---|
| Partall/oddetall – kvalitet | Kort, ryddig Python med god ugyldig-input-håndtering. | Fungerende løsning med gjentatt input og tydelig output. Litt mer omstendelig. |
| Primtall – kvalitet | Dynamisk Eratosthenes-sil; bestod 1, 10 og 10000. | Samme grunnidé og bestod testene etter en nødvendig feilretting. |
| Quiz – kvalitet | Separat HTML/CSS/JS, 10 spørsmål og tydelig resultatgjennomgang. | Responsivt kortdesign og resultatliste; modellsvaret ble avkortet og måtte ferdigstilles manuelt. |
| Kodekvalitet | Mest konsistent struktur og navngiving. | Forståelig, men hadde en genereringsfeil og mer kompakt inline-kode i quizzen. |
| Feilhåndtering | Validerer input i begge Python-programmene. | Validerer input, men primtallssvaret hadde først ugyldige `float('log')`/`float('ln')`-uttrykk. |
| Hastighet | Python-testene fullførte alle kontrollverdier uten merkbar venting. | Python-testene fullførte etter feilretting; lokal tekstgenerering tok betydelig lengre tid og timet ut ved første quizforsøk. |
| Brukervennlighet | Quizzen har progress, valgmarkering og «Sjekk»-knapp. | Quizzen har enkel kortvisning, valgmarkering og «Sjekk»-knapp. |
| Ressursbruk | Krever nettverk og ekstern modellkjøring. | Kjørte lokalt, men 9B-modellen brukte mye tid og minne under generering. |
| Behov for oppfølging | Lite oppfølging i dette forsøket. | Høyere oppfølging: prime-fiks og manuell ferdigstillelse av avkortet quizsvar. |

## Faktiske tester

- Partall/oddetall: `2`, `7`, `0` og `-3` ble testet i begge Python-programmene.
- Primtall: `T = 1`, `T = 10` og `T = 10000` ble testet i begge. Begge returnerte
  `2`, `29` og `104729`.
- Quiz: Begge sider ble åpnet i Chromium ved 375 px. Begge lot brukeren velge
  svar, trykke «Sjekk», vise samlet score og vise riktige svar. Ingen horisontal
  scrolling eller JavaScript-feil ble observert.
- Lokal primtallskode måtte korrigeres etter at modellen genererte `float('log')`
  og `float('ln')`. Dette ble erstattet med `math.log`.
- Lokal quizgenerering ble først avbrutt av tidsgrensen og deretter avkortet av
  svargrensen. Den manglende avslutningen ble ferdigstilt manuelt og er markert
  som et avvik, ikke som en ren modell-leveranse.

## Avsluttende refleksjon

Jeg ville brukt skymodellen til større programmeringsoppgaver der sammenheng,
kodekvalitet og rask iterasjon er viktig. Til enkle, korte oppgaver kan den
lokale modellen være et godt valg fordi dataene ikke trenger å forlate maskinen.
En lokal modell er særlig nyttig uten nettverk eller når personvern og kostnad
veier tyngst, men maskinvare og genereringstid kan bli begrensende. Skymodellen
er et bedre valg når oppgaven er stor, krever mye kontekst eller trenger lite
oppfølging.
