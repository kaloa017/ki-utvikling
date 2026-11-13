// test-ytelse.js - Måler kjøretid for primtallsberegning
const { finnNtePrimtall } = require('./primtall.js');

const n = 1000000;

console.log('Tester med n = ' + n.toLocaleString());
console.log('Starter beregning...\n');

console.time('Beregning tok');
const resultat = finnNtePrimtall(n);
console.timeEnd('Beregning tok');

console.log('\nPrimtall nummer ' + n.toLocaleString() + ' er: ' + resultat.toLocaleString());
