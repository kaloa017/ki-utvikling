// test-ytelse-optimalisert.js - Måler kjøretid for optimalisert primtallsberegning
const { finnNtePrimtall } = require('./primtall-optimalisert.js');

const n = 1000000;

console.log('Tester OPTIMALISERT versjon med n = ' + n.toLocaleString());
console.log('Starter beregning...\n');

console.time('Beregning tok');
const resultat = finnNtePrimtall(n);
console.timeEnd('Beregning tok');

console.log('\nPrimtall nummer ' + n.toLocaleString() + ' er: ' + resultat.toLocaleString());
