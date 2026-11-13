// primtall.js - Finn det n-te primtallet

// Funksjon som sjekker om et tall er et primtall
function erPrimtall(tall) {
  if (tall < 2) {
    return false;
  }
  if (tall === 2) {
    return true;
  }
  if (tall % 2 === 0) {
    return false;
  }
  for (let i = 3; i * i <= tall; i += 2) {
    if (tall % i === 0) {
      return false;
    }
  }
  return true;
}

// Funksjon som finner det n-te primtallet
function finnNtePrimtall(n) {
  let antall = 0;
  let tall = 2;
  
  while (antall < n) {
    if (erPrimtall(tall)) {
      antall++;
      if (antall === n) {
        return tall;
      }
    }
    tall++;
  }
}

// Hvis programmet kjøres direkte (ikke importert som modul)
if (require.main === module) {
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Hvilket primtall vil du finne? ', function (svar) {
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
    const n = Number(trimmet);

    // Avvis ikke-numerisk input
    if (isNaN(n)) {
      console.log('Feil: "' + trimmet + '" er ikke et gyldig tall.');
      process.exit(1);
    }

    // Avvis negative tall og null
    if (n <= 0) {
      console.log('Feil: Tallet må være større enn 0.');
      process.exit(1);
    }

    // Beregn og vis resultatet
    console.log('Beregner primtall nummer ' + n + '...');
    const resultat = finnNtePrimtall(n);
    console.log('Primtall nummer ' + n + ' er: ' + resultat);
  });
}

// Eksporter funksjonene for testing
module.exports = { erPrimtall, finnNtePrimtall };
