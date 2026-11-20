# Oppgave 3.1 - Sammenligning av World Conquest landingssider

## Oppgavebeskrivelse

Dette prosjektet sammenligner to versjoner av en landingsside for strategispillet "World Conquest":
- **Versjon 1 (uten skill):** Laget uten frontend-design skill
- **Versjon 2 (med skill):** Laget med Anthropic's frontend-design skill

Målet var å teste om en designskill kan påvirke kvaliteten og originaliteten til en AI-generert nettside.

## Om frontend-design skillen

Frontend-design skillen fra Anthropic instruerer agenten til å:
- Opptre som designleder ved et designstudio
- Gjøre bevisste, meningsfylte valg om palett, typografi og layout
- Unngå generiske AI-mønstre (SaaS-card kit, warm cream backgrounds, ALL-CAPS labels)
- Basere design på produktets emne og målgruppe
- Jobbe i to faser: Planlegge designsystem først, deretter implementere
- Kritisere eget arbeid for å unngå template-følelse

## Tre konkrete forskjeller mellom nettsidene

### 1. Fargepalett og visuell identitet

**Uten skill:**
- Mørk gradient bakgrunn (blå/lilla toner: #0a0e1a, #141824)
- Accent-farger: Rød (#e63946) og oransje (#f4a261)
- Moderne, generisk "gaming" estetikk med neon-aktig glow
- Semi-transparente kort med backdrop blur

**Med skill:**
- Militær-inspirert palett: Military green (#1a2e1a), aged paper (#d4c5a9), blood red (#8b0000), brass gold (#b8860b)
- "War room" estetikk inspirert av gamle kart og militære briefinger
- Flat, autoritativ fargebruk uten gradienter
- Tydelig tematisk kobling til krigføring og territoriell erobring

**Konklusjon:** Versjonen med skill har en mer distinkt, tematisk forankret fargepalett som faktisk minner om militære kart og strategispill, ikke bare generisk "dark gaming theme".

### 2. Typografi og språkbruk

**Uten skill:**
- System font stack (sans-serif)
- Headline: "Conquer. Dominate. Rule the World." (ett ord markert med gradient)
- Moderne, clean typografi
- Knapper: "Play Now", "Learn More"

**Med skill:**
- Ren serif (Georgia) for hele siden - ingen system sans-serif
- Headline: "Commander / The World Is Your Theater" (hierarkisk, ikke bare kraftuttrykk)
- Militær terminologi gjennom hele siden: "Enlist Now", "Begin Campaign", "Study the Field", "Operations", "Command", "Intel"
- Konsekvent "war briefing" tone i copywriting

**Konklusjon:** Versjonen med skill bruker typografi og språk som faktisk reflekterer krigsføring og militær kommunikasjon, ikke bare generiske gaming-fraser. Dette er et direkte resultat av skillens veiledning om å forankre design i emnet.

### 3. Strukturelle valg og layout

**Uten skill:**
- Nummererte steg (01, 02, 03, 04) i "How to Play"-seksjonen
- Identiske rounded cards i features-seksjonen (SaaS-card kit)
- Symmetrisk, sentrert layout
- Fade-and-slide-up animasjoner på hver seksjon

**Med skill:**
- Romerske tall (I, II, III, IV) i doctrine-steps, visuelt integrert med firkantede borders
- Asymmetrisk "map-based" layout med left-aligned content
- Ingen rounded corners (skarpe, taktiske kanter)
- Border-left accent på section headers (som militær briefing-dokument)
- Sparsom animasjon - kun én orchestrated moment

**Konklusjon:** Versjonen med skill unngår "SaaS-card kit"-mønstre som skillen spesifikt advarer mot. Layouten er mer original og tematisk konsistent med krigsføring (skarpe kanter, asymmetri, dokumentarisk struktur).

## Konklusjon

Frontend-design skillen hadde **betydelig innvirkning** på designet:

1. **Tematisk konsistens:** Versjonen med skill er langt mer tematisk forankret i krigsføring og militær estetikk, ikke bare "dark gaming theme".

2. **Originalitet:** Skillen hjalp med å unngå generiske AI-mønstre som rounded cards, gradient accents, og fade-up animations på alt.

3. **Bevisste valg:** Versjonen med skill viser tydelige designbeslutninger (serif-only, militær terminologi, flat colors, sharp edges) som er begrunnet i emnet, ikke bare "moderne" defaults.

Skillen fungerer som designleder som utfordrer agenten til å tenke kritisk om hvert valg og unngå template-følelse. Resultatet er en mer distinkt, gjenkjennelig nettside som faktisk føles som et strategispill om verdensherredømme.

## Oppgave 3.2 – responsivt løft

Hovedsiden er videreutviklet uten å bytte teknologi. Den har nå et lokalt hero-kart
(`hero-map.svg`), forbedret mobilmeny med `aria-expanded` og Escape-lukking,
tilgjengelige feilmeldinger i kontaktskjemaet, kontaktinformasjon i footeren og
en tydelig forklaring på at skjemaet kun valideres lokalt fordi prosjektet ikke
har backend eller e-postintegrasjon.

Ved testing i Chromium på 375, 768 og 1440 px ble det funnet en reell feil på
demonstrasjonssiden: den skjulte mobilnavigasjonen lå over hamburgerknappen og
blokkerte trykk. Dette ble rettet med eksplisitt `z-index` på toggle-knappen og
navigasjonen. Etter rettingen åpnet og lukket menyen korrekt med berøring og
Escape, og ingen av breddene fikk horisontal scrolling.

### Filer for design-skill

`.github/skills/min-stil/SKILL.md` beskriver fargepalett, typografi, spacing,
komponenter, responsive bruddpunkter, tilgjengelighet og animasjonsregler.
`demo-min-stil.html` og `demo-min-stil.css` bruker disse reglene i en separat
TaskFlow-landingsside med en annen struktur enn World Conquest. Den tilhørende
`demo-min-stil.js` viser fungerende mobilmeny og skjemavalidering.
