// partall.js - Sjekker om et tall er partall eller oddetall
// Laget for nybegynnere i JavaScript / Node.js

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Skriv inn et heltall: ', function (svar) {
  rl.close();

  const trimmet = svar.trim();

  // Avvis tom input
  if (trimmet === '') {
    console.log('Feil: Du skrev ikke inn noe tall.');
    process.exit(1);
  }

  // Avvis desimaltall
  if (trimmet.includes('.') || trimmet.includes(',')) {
    console.log('Feil: Desimaltall er ikke tillatt. Skriv inn et heltall.');
    process.exit(1);
  }

  // Konverter til tall
  const tall = Number(trimmet);

  // Avvis ikke-numerisk input (f.eks. bokstaver)
  if (isNaN(tall)) {
    console.log('Feil: "' + trimmet + '" er ikke et gyldig tall. Skriv inn et heltall.');
    process.exit(1);
  }

  // Sjekk partall eller oddetall
  if (tall % 2 === 0) {
    console.log(tall + ' er et partall.');
  } else {
    console.log(tall + ' er et oddetall.');
  }
});
