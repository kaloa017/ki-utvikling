const express = require('express');
const path = require('node:path');
const fs = require('node:fs/promises');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const PUBLIC_DIR = path.join(__dirname, 'public');
const MAX_NAME_LENGTH = 30;
const MAX_SCORE = 10;

let writeQueue = Promise.resolve();

app.use(express.json({ limit: '10kb' }));
app.use(express.static(PUBLIC_DIR));

function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function isValidScoreEntry(entry) {
  return entry
    && typeof entry.name === 'string'
    && entry.name.trim().length > 0
    && entry.name.trim().length <= MAX_NAME_LENGTH
    && Number.isInteger(entry.score)
    && entry.score >= 0
    && entry.score <= MAX_SCORE
    && typeof entry.date === 'string'
    && !Number.isNaN(Date.parse(entry.date));
}

function sortScores(scores) {
  return [...scores].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const dateOrder = Date.parse(a.date) - Date.parse(b.date);
    if (dateOrder !== 0) return dateOrder;
    return a.name.localeCompare(b.name, 'nb', { sensitivity: 'base' });
  });
}

async function readScores() {
  let contents;
  try {
    contents = await fs.readFile(DATA_FILE, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  let parsed;
  try {
    parsed = JSON.parse(contents);
  } catch {
    throw createHttpError(500, 'Lagringsfilen inneholder ugyldig JSON.');
  }

  if (!Array.isArray(parsed) || !parsed.every(isValidScoreEntry)) {
    throw createHttpError(500, 'Lagringsfilen har ugyldig format.');
  }

  return parsed;
}

function appendScore(submission) {
  let savedResult;
  writeQueue = writeQueue.then(async () => {
    const scores = await readScores();
    savedResult = {
      ...submission,
      date: new Date().toISOString()
    };
    scores.push(savedResult);
    const temporaryFile = `${DATA_FILE}.tmp`;
    await fs.writeFile(temporaryFile, `${JSON.stringify(scores, null, 2)}\n`, 'utf8');
    await fs.rename(temporaryFile, DATA_FILE);
  });
  return writeQueue.then(() => savedResult);
}

function validateSubmission(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw createHttpError(400, 'Forespørselen må være et JSON-objekt.');
  }

  if (typeof body.name !== 'string') {
    throw createHttpError(400, 'Navn må være tekst.');
  }

  const name = body.name.trim();
  if (!name) {
    throw createHttpError(400, 'Navn kan ikke være tomt.');
  }
  if (name.length > MAX_NAME_LENGTH) {
    throw createHttpError(400, `Navn kan ikke være lengre enn ${MAX_NAME_LENGTH} tegn.`);
  }
  if (!Number.isInteger(body.score) || body.score < 0 || body.score > MAX_SCORE) {
    throw createHttpError(400, `Poengsum må være et heltall mellom 0 og ${MAX_SCORE}.`);
  }

  return { name, score: body.score };
}

app.get('/api/highscores', async (req, res, next) => {
  try {
    const scores = await readScores();
    res.json(sortScores(scores).slice(0, 10));
  } catch (error) {
    next(error);
  }
});

app.post('/api/highscores', async (req, res, next) => {
  try {
    const submission = validateSubmission(req.body);
    const result = await appendScore(submission);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    next(createHttpError(404, 'API-endepunktet finnes ikke.'));
    return;
  }
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    res.status(400).json({ error: 'Ugyldig JSON i forespørselen.' });
    return;
  }

  const status = Number.isInteger(error.status) ? error.status : 500;
  if (status >= 500) console.error(error);
  res.status(status).json({
    error: status >= 500 ? 'En intern serverfeil oppstod.' : error.message
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Quiz server kjører på http://localhost:${PORT}`);
  });
}

module.exports = { app, DATA_FILE, readScores, sortScores, validateSubmission };
