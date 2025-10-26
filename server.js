const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'bookings.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Simple helper to read/write bookings
function readBookings(){
  try{
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  }catch(e){
    return [];
  }
}
function writeBookings(list){
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
}

// Sample movies (same as frontend sample)
const movies = [
  { id: 1, title: 'Sundaripuram', lang: 'Telugu', times: ['11:00','14:30','19:00'] },
  { id: 2, title: 'Racing Hearts', lang: 'Telugu', times: ['12:45','16:00','21:15'] },
  { id: 3, title: 'Monsoon Letters', lang: 'Telugu', times: ['10:30','18:00'] },
  { id: 4, title: 'Midnight Signal', lang: 'English', times: ['13:00','17:20','22:00'] },
  { id: 5, title: 'Starbound', lang: 'English', times: ['11:15','16:30','20:45'] },
  { id: 6, title: 'Laugh Track', lang: 'English', times: ['10:00','14:00','18:00'] },
  { id: 7, title: 'Dil Se Door', lang: 'Hindi', times: ['11:30','15:45','20:00'] },
  { id: 8, title: 'City Lights', lang: 'Hindi', times: ['13:45','18:15'] },
  { id: 9, title: 'Operation Falcon', lang: 'Hindi', times: ['16:00','21:30'] },
  { id: 10, title: 'Nadodigal Returns', lang: 'Tamil', times: ['12:30','19:00'] },
  { id: 11, title: 'Ocean Blue', lang: 'Tamil', times: ['14:15','20:45'] }
];

app.get('/api/ping', (req,res)=> res.json({ok:true, now: new Date()}));
app.get('/api/movies', (req,res)=> res.json(movies));
app.get('/api/bookings', (req,res)=>{
  const list = readBookings();
  res.json(list);
});

app.post('/api/book', (req,res)=>{
  const { movie, lang, time, seats, name } = req.body || {};
  if(!movie || !time || !name || !seats) return res.status(400).json({ error: 'Missing fields' });
  const list = readBookings();
  const id = (list.length? list[list.length-1].id : 0) + 1;
  const b = { id, movie, lang, time, seats, name, createdAt: new Date().toISOString() };
  list.push(b);
  writeBookings(list);
  res.status(201).json(b);
});

app.delete('/api/bookings', (req,res)=>{
  writeBookings([]);
  res.json({ ok: true });
});

// Serve index page
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, 'kommalas.html'));
});

app.listen(PORT, ()=> console.log(`Kommalas backend listening on port ${PORT}`));
