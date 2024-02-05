const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const pdf = require('html-pdf');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/save', async (req, res) => {
    const { name, email, personen } = req.body;

    // Log received data
    console.log('Received Data:', name, email, personen);

    // Create PDF
    const htmlContent = `<p>Name: ${name}</p><p>Email: ${email}</p><p>Personen: ${personen}</p>`;
    const pdfOptions = { format: 'Letter' };
    pdf.create(htmlContent, pdfOptions).toFile('personeninformationen.pdf', (err, result) => {
        if (err) return console.log(err);
        console.log('PDF created:', result);

        // Send Email with PDF attachment
        sendEmail(name, email, result.filename);

        res.json({ success: true });
    });
});

function sendEmail(name, email, pdfAttachment) {
    // Configure nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your.email@gmail.com', // replace with your email
            pass: 'yourPassword' // replace with your password
        }
    });

    // Email content
    const mailOptions = {
        from: 'your.email@gmail.com', // replace with your email
        to: 'recipient.address@example.com', // replace with recipient's email
        subject: 'Personeninformationen',
        text: 'Vielen Dank für die Anmeldung!',
        attachments: [
            {
                filename: 'personeninformationen.pdf',
                path: pdfAttachment
            }
        ]
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent:', info.response);
    });
}
