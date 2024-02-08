const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/hallo.html');
});
const port = process.env.PORT || 3001;



const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//server.keepAliveTimeout = 120 * 1000;
//server.headersTimeout = 120 * 1000;





const pool = new Pool({
  user: 'dbname_d0um_user',
  host: 'dpg-cn0hh20cmk4c73anb0gg-a.frankfurt-postgres.render.com',
 
  database: 'dbname_d0um',
  password: 'ZCRheURsQQdzre3qv6Xuo26ParCncgNV',
  port: 5432,
  ssl: {
    rejectUnauthorized: false, 
    // ca: fs.readFileSync('/pfad/zum/ca-cert.pem'), 
    // cert: fs.readFileSync('/pfad/zum/client-cert.pem'), 
    // key: fs.readFileSync('/pfad/zum/client-key.pem') 
  }
});



app.post('/submit', (req, res) => {
  const { name, email, anzahl } = req.body;
 const values = [name, email, anzahl];
  const query = 'INSERT INTO Personen (name, email, anzahl) VALUES ($1, $2, $3)';
//const query = 'INSERT INTO Personen (name, email, anzahl) VALUES ("Max Mustermann12", "maxe.mustermann@example.com", 52)';
 

 
pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Fehler beim Einfügen der Daten:', err);
      res.status(500).send('Serverfehler: Wenn Sie sich nicht erfolgreich anmelden können, senden Sie bitte eine Email an messner@reisefibel.de');
    } else {
      console.log('Daten erfolgreich eingefügt:', result.rows);
      res.send('Daten erfolgreich eingereicht');
    }
  });
});
