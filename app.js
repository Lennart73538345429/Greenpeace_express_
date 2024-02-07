const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Statische Dateien im "public" Verzeichnis servieren
app.use(express.static('public'));

// Routen für die Homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index1.html');
});
const port = process.env.PORT || 3001;



const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;




// PostgreSQL Datenbank Konfiguration
const pool = new Pool({
  user: 'dein_pg_benutzer',
  host: 'localhost',
  database: 'deine_datenbank',
  password: 'dein_pg_passwort',
  port: 5432,
});


// POST-Routen für das Formular
app.post('/submit', (req, res) => {
  const { name, email, anzahl } = req.body;

  // SQL Query für das Einfügen der Daten
  const query = 'INSERT INTO personen (name, email, anzahl) VALUES ($1, $2, $3)';
  const values = [name, email, anzahl];

  // Daten in die Datenbank einfügen
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Fehler beim Einfügen der Daten:', err);
      res.status(500).send('Interner Serverfehler');
    } else {
      console.log('Daten erfolgreich eingefügt:', result.rows);
      res.send('Daten erfolgreich eingereicht');
    }
  });
});
