const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'lateness.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

function readLateness() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return raw ? JSON.parse(raw) : [];
}

function writeLateness(records) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2));
}

app.get('/api/lateness', (req, res) => {
  const records = readLateness();
  res.json(records);
});

app.post('/api/lateness', (req, res) => {
  const { studentName, studentId, class: className, minutesLate, reason, contactEmail } = req.body;

  if (!studentName || !studentId || !className || !minutesLate || !contactEmail) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const now = new Date();
  const record = {
    id: Date.now(),
    time: now.toTimeString().slice(0, 5),
    studentName,
    studentId,
    class: className,
    minutesLate: Number(minutesLate),
    reason: reason || '',
    contactEmail,
    createdAt: now.toISOString()
  };

  const records = readLateness();
  records.unshift(record);
  writeLateness(records);

  res.status(201).json(record);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
