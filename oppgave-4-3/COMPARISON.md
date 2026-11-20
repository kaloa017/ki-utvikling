# Sammenligning: GPT-5.6 Luna mot Qwen3.5 9B

## Kort konklusjon

GPT-5.6 Luna leverte den mest komplette og konsistente helheten i dette
forsøket, særlig for quiz-nettsiden og primtalloppgaven. Qwen3.5:9b leverte
brukbare ideer og fungerende kode etter oppfølging, men trengte mer kontroll:
primtallskoden hadde en konkret Python-feil, og quizsvaret ble først avkortet.
Den lokale modellen er likevel et reelt alternativ når personvern, offline-drift
eller fravær av API-kostnader er viktigere enn hastighet og minst mulig
oppfølging.

## Modellene

| Modell | Kjøremiljø | Versjon/egenskaper |
|---|---|---|
| GPT-5.6 Luna | Skybasert agent | Modell-ID `gpt-5.6-luna` |
| Qwen3.5:9b | Ollama lokalt | 9.0B, Q4_K_M, Ollama `0.40.16` |

GPT-5.6 Luna-løsningene ligger under `sky/`. Qwen-løsningene ligger under
`lokal/`. De tilsvarende løsningene ble holdt i separate mapper.

## Metode og rettferdighet

Begge modellene fikk de samme tre oppgaveinstruksene:

1. Partall eller oddetall med ugyldig input.
2. T-te primtall med større verdier og forklaring.
3. Quiz med minst 10 spørsmål, 4 svaralternativer, «Sjekk»-knapp,
   resultatgjennomgang og responsivt design.

Det finnes to dokumenterte avvik:

- Lokalmodellen fikk en ekstra arbeidsinstruks om lav ressursbruk, én oppgave om
  gangen og korte svar. Dette var brukerens eksplisitte instruks og gjør
  sammenligningen litt mindre strikt.
- Lokalmodellens primtallskode måtte korrigeres etter testing. Quizsvaret ble
  avkortet ved generering, så den manglende avslutningen måtte ferdigstilles
  manuelt. Dette regnes som oppfølging, ikke som ren lokalmodell-leveranse.

## Hvilke filer er sammenlignet?

| Oppgave | GPT-5.6 Luna | Qwen3.5:9b |
|---|---|---|
| Partall | `sky/oppgave-1-partall/partall.py` | `lokal/oppgave-1-partall/partall.py` |
| Primtall | `sky/oppgave-2-primtall/primtall.py` | `lokal/oppgave-2-primtall/primtall.py` |
| Quiz | `sky/oppgave-3-quiz/` | `lokal/oppgave-3-quiz/index.html` |

## Faktiske tester

### Partall og oddetall

Følgende input ble kjørt mot begge Python-programmene:

| Input | Forventet | GPT-5.6 Luna | Qwen3.5:9b |
|---:|---|---|---|
| `2` | Partall | Bestått | Bestått |
| `7` | Oddetall | Bestått | Bestått |
| `0` | Partall | Bestått | Bestått |
| `-3` | Oddetall | Bestått | Bestått |

Begge håndterer tekst som ugyldig input. Skyversjonen er kortere og avslutter
etter ett tall, mens lokalversjonen tilbyr en repetisjonsløkke.

### Primtall nr. T

Begge implementasjonene ble testet med:

| T | Forventet | GPT-5.6 Luna | Qwen3.5:9b etter korrigering |
|---:|---:|---:|---:|
| `1` | `2` | Bestått | Bestått |
| `10` | `29` | Bestått | Bestått |
| `10000` | `104729` | Bestått | Bestått |

Begge bruker Eratosthenes-sil med dynamisk grense. Den første lokale
genereringen brukte ugyldige uttrykk som `float('log')` og `float('ln')`;
disse ble erstattet med `math.log`. Dette er en konkret kvalitetsforskjell og
viser hvorfor resultatet måtte testes før det kunne godkjennes.

### Quiz-nettsider

Begge quizene ble åpnet i Chromium ved 375 px og 1440 px.

| Kontroll | GPT-5.6 Luna | Qwen3.5:9b |
|---|---|---|
| Minst 10 spørsmål | Bestått | Bestått |
| 4 svaralternativer | Bestått | Bestått |
| «Sjekk»-knapp | Bestått | Bestått |
| Poengsum | Bestått | Bestått |
| Riktige svar vises | Bestått | Bestått |
| Feil svar vises | Bestått | Bestått |
| Mobilbredde uten scrolling | Bestått | Bestått |
| Desktopbredde uten scrolling | Bestått | Bestått |
| JavaScript-feil i nettleser | Ingen | Ingen |

Skyversjonen bruker separat HTML, CSS og JavaScript med progressindikator og
mer tydelig visuell hierarki. Lokalversjonen følger modellens opprinnelige
enkel-fil-retning med inline CSS og JavaScript, og er derfor enklere å starte,
men vanskeligere å videreutvikle.

## Sammenligning etter kriterium

### Kvalitet

GPT-5.6 Luna ga gjennomgående mer ferdige leveranser med tydeligere struktur.
Qwen3.5:9b ga fungerende partallskode og en god algoritmisk retning, men
primtallskoden var ikke kjørbar før korrigering. Quizresultatet ble godt etter
ferdigstillelse, men selve genereringen ble avkortet.

### Kodekvalitet og vedlikehold

Skyoppgavene bruker tydelige funksjoner, separate webfiler og mer konsistent
navngiving. Lokalmodellen favoriserte kort og kompakt kode, spesielt i
quizzen. Det er lett å kopiere og kjøre, men mindre egnet som utgangspunkt for
videre utvikling.

### Feilhåndtering

Begge partallsløsningene håndterer ugyldig input. Begge endelige
primtallsløsninger avviser ugyldig T. Forskjellen er at lokalmodellens første
primtallssvar inneholdt en feil som først ble synlig ved faktisk kjøring.

### Hastighet

Selve Python-testene fullførte raskt for begge modeller. Den store forskjellen
kom under modellgenerering: Qwen3.5:9b brukte flere minutter på primtall- og
quizsvar, og ett quizkall traff tidsgrensen. GPT-5.6 Luna kunne iterere videre
uten denne ventetiden i agentmiljøet. Det er ikke målt en nøyaktig total
genereringstid for GPT, så denne delen er en observert kvalitativ forskjell,
ikke en millisekundmåling.

### Ressursbruk og tilgjengelighet

Qwen kjører uten nettverk og uten ekstern API-kostnad, men krever lokal
maskinvare og brukte betydelig tid på 9B-generering. Skymodellen krever
tilkobling til agenttjenesten, men håndterte større kontekst og iterasjon
raskere i dette forsøket.

### Behov for oppfølging

GPT-løsningene krevde ingen tilsvarende manuell reparasjon i testene. Qwen
trengte én kodekorrigering og manuell ferdigstillelse av quizsvaret. Det gjør
lokalmodellen bedre egnet når brukeren kan kontrollere og reparere kode selv,
mens skymodellen passer bedre når første leveranse skal være mer komplett.

## Vurdering

Jeg ville brukt GPT-5.6 Luna til større programmeringsoppgaver, spesielt når
flere filer, designvalg og iterasjoner må henge sammen. Jeg ville brukt
Qwen3.5:9b til enkle, lokale oppgaver der personvern, offline-tilgang eller
lav marginalkostnad er viktigst. En lokal modell er et bedre valg når data ikke
kan sendes til en skytjeneste, men den krever mer lokal maskinvare og
verifisering. En skymodell er et bedre valg når oppgaven trenger mye kontekst,
stabil kodekvalitet og lite oppfølging.
