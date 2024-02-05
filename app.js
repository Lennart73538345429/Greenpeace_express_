
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/save', (req, res) => {
    const { name, email, personen } = req.body;
    // Server
    console.log('Empfangene Daten:', name, email, personen);
    res.json({ success: true });
});

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- ... (wie zuvor) ... -->
</head>
<body>
    <div class="container">
        <!-- ... (wie zuvor) ... -->
        <form id="personForm">
            <!-- ... (wie zuvor) ... -->
            <button type="button" onclick="saveData()">Speichern</button>
        </form>

        <div id="output"></div>
    </div>

    <script>
        function saveData() {
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var personen = document.getElementById('age').value; // 'age' zu 'personen' geändert

            if (name && email && personen) {
                var csvData = 'Name,Email,Age\n' + name + ',' + email + ',' + personen + '\n';
                var blob = new Blob([csvData], { type: 'text/csv' });
                var a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'personeninformationen.csv';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                var outputDiv = document.getElementById('output');
                outputDiv.innerHTML = 'Email wird an Sie in Kürze versandt. Wenn nicht, ist dies kein Problem; die Veranstaltung ist kostenfrei.';
            } else {
                var outputDiv = document.getElementById('output');
                outputDiv.innerHTML = 'Bitte füllen Sie alle Felder aus.';
            }
        }
    </script>
</body>
</html>
`
