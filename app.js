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
            <input type="number" id="age" name="age" required>

            <button type="button" onclick="saveData()">Speichern</button>
        </form>

        <div id="output"></div>
    </div>

    <script>
        function saveData() {
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var personen = document.getElementById('age').value;

            // Überprüfen, ob alle Felder ausgefüllt sind
            if (name && email && age) {
                // CSV-Daten erstellen
                var csvData = 'Name,Email,Age\n' + name + ',' + email + ',' + age + '\n';

                // Blob erstellen
                var blob = new Blob([csvData], { type: 'text/csv' });

                // Anchor-Element erstellen und herunterladen auslösen
                var a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'personeninformationen.csv';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                // Erfolgsmeldung anzeigen
                var outputDiv = document.getElementById('output');
                outputDiv.innerHTML = 'Email wird an Sie in kürze versand Wenn nicht ist dies kein Problem die Veranstaltung ist kostenfrei';
            } else {
                // Fehlermeldung anzeigen
                var outputDiv = document.getElementById('output');
                outputDiv.innerHTML = 'Bitte füllen Sie alle Felder aus.';
            }
        }
	const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/save', (req, res) => {
    const { name, email, personen } = req.body;
    // Server
    console.log('Empfangene Daten:', name, email, anzahl);
    res.json({ success: true });
});


    </script>
</body>
</html>
`
