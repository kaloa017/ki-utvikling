const questions = [
  { category: 'Internett', question: 'Hva står forkortelsen URL for?', answers: ['Universal Resource Locator', 'User Route Link', 'Unified Record Line', 'Universal Read Language'], correct: 0 },
  { category: 'Maskinvare', question: 'Hvilken komponent utfører hovedsakelig beregninger i en datamaskin?', answers: ['RAM', 'CPU', 'SSD', 'Strømforsyning'], correct: 1 },
  { category: 'Programvare', question: 'Hva er JavaScript først og fremst?', answers: ['Et programmeringsspråk', 'Et operativsystem', 'En database', 'En nettleser'], correct: 0 },
  { category: 'Sikkerhet', question: 'Hva kjennetegner et sterkt passord?', answers: ['Kun fødselsdatoen din', 'Kort og lett å huske', 'En unik kombinasjon av flere tegn', 'Det samme på alle tjenester'], correct: 2 },
  { category: 'Data', question: 'Hvor mange bits er det i én byte?', answers: ['4', '8', '16', '32'], correct: 1 },
  { category: 'Nettverk', question: 'Hva brukes Wi-Fi primært til?', answers: ['Trådløs nettverkstilkobling', 'Å lagre bilder', 'Å skrive ut uten blekk', 'Å kjøle ned CPU-en'], correct: 0 },
  { category: 'Web', question: 'Hva brukes HTML hovedsakelig til?', answers: ['Strukturere innhold på nettsider', 'Kryptere harddisker', 'Redigere video', 'Kompilere JavaScript'], correct: 0 },
  { category: 'Historie', question: 'Hvem regnes som en av oppfinnerne av World Wide Web?', answers: ['Ada Lovelace', 'Tim Berners-Lee', 'Grace Hopper', 'Dennis Ritchie'], correct: 1 },
  { category: 'Lagring', question: 'Hva er en database?', answers: ['Et strukturert lager for data', 'En type skjerm', 'Et lydformat', 'En nettleserutvidelse'], correct: 0 },
  { category: 'Kildekode', question: 'Hva betyr det at programvare er åpen kildekode?', answers: ['Den er alltid gratis', 'Kildekoden er tilgjengelig for innsyn og videreutvikling', 'Den virker uten internett', 'Den er skrevet uten feil'], correct: 1 }
];

const homeView = document.getElementById('homeView');
const quizView = document.getElementById('quizView');
const resultView = document.getElementById('resultView');
const startButton = document.getElementById('startButton');
const nextButton = document.getElementById('nextButton');
const playAgainButton = document.getElementById('playAgainButton');
const refreshScoresButton = document.getElementById('refreshScoresButton');
const answerOptions = document.getElementById('answerOptions');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const questionCategory = document.getElementById('questionCategory');
const quizTitle = document.getElementById('quizTitle');
const answerHint = document.getElementById('answerHint');
const finalScore = document.getElementById('finalScore');
const resultMessage = document.getElementById('resultMessage');
const scoreForm = document.getElementById('scoreForm');
const playerName = document.getElementById('playerName');
const formError = document.getElementById('formError');
const formSuccess = document.getElementById('formSuccess');
const homeScores = document.getElementById('homeScores');
const resultScores = document.getElementById('resultScores');

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function showView(view) {
  [homeView, quizView, resultView].forEach((section) => {
    section.hidden = section !== view;
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showView(quizView);
  renderQuestion();
}

function renderQuestion() {
  const item = questions[currentQuestion];
  selectedAnswer = null;
  questionCategory.textContent = item.category;
  quizTitle.textContent = item.question;
  progressText.textContent = `Spørsmål ${currentQuestion + 1} av ${questions.length}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  answerHint.textContent = 'Velg ett svar for å fortsette.';
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length - 1 ? 'Se resultatet →' : 'Neste spørsmål →';
  answerOptions.replaceChildren();

  item.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-button';
    const letter = document.createElement('span');
    letter.className = 'answer-letter';
    letter.textContent = String.fromCharCode(65 + index);
    const answerText = document.createElement('span');
    answerText.textContent = answer;
    button.append(letter, answerText);
    button.addEventListener('click', () => selectAnswer(index, button));
    answerOptions.append(button);
  });
}

function selectAnswer(index, button) {
  selectedAnswer = index;
  document.querySelectorAll('.answer-button').forEach((option) => option.classList.remove('selected'));
  button.classList.add('selected');
  nextButton.disabled = false;
  answerHint.textContent = 'Svar valgt. Fortsett når du er klar.';
}

function nextQuestion() {
  if (selectedAnswer === null) return;
  if (selectedAnswer === questions[currentQuestion].correct) score += 1;
  currentQuestion += 1;
  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showView(resultView);
  finalScore.textContent = score;
  resultMessage.textContent = score >= 8
    ? 'Imponerende oversikt. Tavlen venter på navnet ditt.'
    : score >= 5
      ? 'Solid innsats. Klarer du å slå resultatet neste gang?'
      : 'En god start. Ta quizen på nytt og jakt på flere riktige svar.';
  playerName.value = '';
  formError.textContent = '';
  formSuccess.textContent = '';
  loadScores(resultScores);
}

function renderScores(container, scores) {
  container.replaceChildren();
  if (!scores.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-message';
    empty.textContent = 'Ingen resultater ennå. Bli den første på tavlen.';
    container.append(empty);
    return;
  }

  scores.forEach((entry, index) => {
    const row = document.createElement('div');
    row.className = 'score-row';
    const rank = document.createElement('span');
    rank.className = 'score-rank';
    rank.textContent = `${String(index + 1).padStart(2, '0')}.`;
    const details = document.createElement('span');
    details.className = 'score-name';
    details.textContent = entry.name;
    details.title = entry.name;
    const points = document.createElement('span');
    points.className = 'score-points';
    points.textContent = `${entry.score}/10`;
    row.append(rank, details, points);
    container.append(row);
  });
}

async function loadScores(container) {
  container.replaceChildren();
  const loading = document.createElement('p');
  loading.className = 'loading-message';
  loading.textContent = 'Laster resultater …';
  container.append(loading);
  try {
    const response = await fetch('/api/highscores');
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || 'Kunne ikke hente resultater.');
    renderScores(container, payload);
  } catch (error) {
    container.replaceChildren();
    const message = document.createElement('p');
    message.className = 'error-message';
    message.textContent = `Highscore er ikke tilgjengelig akkurat nå: ${error.message}`;
    container.append(message);
  }
}

scoreForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  formError.textContent = '';
  formSuccess.textContent = '';
  const name = playerName.value.trim();
  if (!name) {
    formError.textContent = 'Skriv inn et navn før du lagrer resultatet.';
    playerName.focus();
    return;
  }

  const submitButton = scoreForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Lagrer …';
  try {
    const response = await fetch('/api/highscores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || 'Kunne ikke lagre resultatet.');
    formSuccess.textContent = 'Resultatet er lagret på highscore-listen.';
    await loadScores(resultScores);
    await loadScores(homeScores);
  } catch (error) {
    formError.textContent = `Resultatet kunne ikke lagres: ${error.message}`;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Lagre resultat';
  }
});

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
playAgainButton.addEventListener('click', startQuiz);
refreshScoresButton.addEventListener('click', () => loadScores(homeScores));

loadScores(homeScores);
