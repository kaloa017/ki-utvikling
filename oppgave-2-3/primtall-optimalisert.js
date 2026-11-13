// primtall-optimalisert.js - Optimalisert primtallsfinner med Sieve of Eratosthenes

// Funksjon som sjekker om et tall er et primtall (enkel metode)
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

// Optimalisert funksjon som finner det n-te primtallet
// Bruker Sieve of Eratosthenes for å generere primtall effektivt
function finnNtePrimtall(n) {
  // Estimat for øvre grense basert på Prime Number Theorem
  // n-te primtall er omtrent n * ln(n) for store n
  let grense = n < 6 ? 15 : Math.ceil(n * (Math.log(n) + Math.log(Math.log(n))));
  
  while (true) {
    // Opprett en boolean array, initialisert til true
    const erPrim = new Array(grense + 1).fill(true);
    erPrim[0] = erPrim[1] = false;
    
    // Sieve of Eratosthenes
    for (let i = 2; i * i <= grense; i++) {
      if (erPrim[i]) {
        // Marker alle multipler av i som ikke-prim
        for (let j = i * i; j <= grense; j += i) {
          erPrim[j] = false;
        }
      }
    }
    
    // Tell primtall
    let antall = 0;
    for (let i = 2; i <= grense; i++) {
      if (erPrim[i]) {
        antall++;
        if (antall === n) {
          return i;
        }
      }
    }
    
    // Hvis vi ikke fant nok primtall, øk grensen
    grense = Math.ceil(grense * 1.5);
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
