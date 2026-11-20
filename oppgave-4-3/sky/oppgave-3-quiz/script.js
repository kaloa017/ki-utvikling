const questions = [
  ['Hva er CPU-en?', ['Prosessoren', 'Lagringen', 'Skjermen', 'Nettverket'], 0],
  ['Hvor mange bits er én byte?', ['4', '8', '16', '32'], 1],
  ['Hva brukes HTML til?', ['Struktur', 'Kryptering', 'Lyd', 'Databaser'], 0],
  ['Hvilken planet er nærmest solen?', ['Mars', 'Venus', 'Merkur', 'Jorden'], 2],
  ['Hva er H2O?', ['Salt', 'Vann', 'Oksygen', 'Hydrogen'], 1],
  ['Hva står URL for?', ['Universal Resource Locator', 'User Route Link', 'Unified Record Line', 'Unit Read List'], 0],
  ['Hvilket tall er et primtall?', ['9', '15', '21', '23'], 3],
  ['Hva er RAM?', ['Midlertidig minne', 'Et operativsystem', 'En kabel', 'En nettleser'], 0],
  ['Hvor mange sider har en trekant?', ['2', '3', '4', '5'], 1],
  ['Hva bruker vi en database til?', ['Strukturert datalagring', 'Å tegne bilder', 'Å kjøle PC-en', 'Å skrive ut'], 0]
];
let current = 0; let selected = null; let score = 0;
const $ = (id) => document.getElementById(id);
function render() {
  const [text, answers] = questions[current];
  $('question').textContent = text; $('counter').textContent = `Spørsmål ${current + 1} av ${questions.length}`;
  $('progress').textContent = `${Math.round((current + 1) / questions.length * 100)}%`;
  $('bar').style.width = `${(current + 1) / questions.length * 100}%`;
  $('answers').replaceChildren(); selected = null; $('check').disabled = true;
  answers.forEach((answer, index) => {
    const button = document.createElement('button'); button.className = 'answer'; button.type = 'button'; button.textContent = answer;
    button.addEventListener('click', () => { selected = index; document.querySelectorAll('.answer').forEach((item) => item.classList.remove('selected')); button.classList.add('selected'); $('check').disabled = false; });
    $('answers').append(button);
  });
}
function finish() {
  $('quiz').hidden = true; $('result').hidden = false; $('score').textContent = `${score}/${questions.length} riktige`; $('review').replaceChildren();
  questions.forEach(([question, answers, correct], index) => { const item = document.createElement('div'); item.className = `review ${answers[correct] === answers[window[`answer${index}`]] ? 'correct' : ''}`; item.textContent = `${index + 1}. ${question} — Riktig svar: ${answers[correct]}`; $('review').append(item); });
}
$('check').addEventListener('click', () => { window[`answer${current}`] = selected; if (selected === questions[current][2]) score += 1; current += 1; current < questions.length ? render() : finish(); });
$('again').addEventListener('click', () => { current = 0; score = 0; for (let i=0;i<questions.length;i+=1) delete window[`answer${i}`]; $('quiz').hidden = false; $('result').hidden = true; render(); });
render();
