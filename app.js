


const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
	    
            background-color: #f4f4f4;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        form {
            display: flex;
            flex-direction: column;
        }

        label {
            margin-bottom: 8px;
        }

        input, button {
            margin-bottom: 16px;
            padding: 8px;
            font-size: 16px;
        }

        button {
            cursor: pointer;
            background-color: #4caf50;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 10px;
        }
    </style>
    <title>Personeninformationen</title>
</head>
<body>
    <div class="container">
        <h1>Ticket Markus Maute</h1>
        <form id="personForm">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>

            <label for="email">E-Mail:</label>
            <input type="email" id="email" name="email" required>

            <label for="age">Personen:</label>
            <input type="number" id="anzahl" name="anzahl" required>

            <button type="button" onclick="saveData()">Speichern</button>
        </form>

        <div id="output"></div>
    </div>

    <script>
   // Import the pg-promise library
const pgp = require('pg-promise')();

// Set up the database connection
const db = pgp('postgres://dbname_d0um_user:ZCRheURsQQdzre3qv6Xuo26ParCncgNV@dpg-cn0hh20cmk4c73anb0gg-a/dbname_d0um');

// ...

// Update saveData function
function saveData() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var anzahl = document.getElementById('anzahl').value;

    // Überprüfen, ob alle Felder ausgefüllt sind
    if (name && email && anzahl) {
        // Insert data into PostgreSQL
        db.none('INSERT INTO your_table_name(name, email, age) VALUES($1, $2, $3)', [name, email, anzahl])
            .then(() => {
                // Erfolgsmeldung anzeigen
                var outputDiv = document.getElementById('output');
                outputDiv.innerHTML = 'Daten erfolgreich gespeichert!';
            })
            .catch(error => {
                // Fehlermeldung anzeigen
                var outputDiv = document.getElementById('output');
                outputDiv.innerHTML = 'Fehler beim Speichern der Daten.';
                console.error('Error inserting data:', error);
            });
    } else {
        // Fehlermeldung anzeigen
        var outputDiv = document.getElementById('output');
        outputDiv.innerHTML = 'Bitte füllen Sie alle Felder aus.';
    }
}


    </script>
</body>
</html>
`
