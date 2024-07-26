const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const app = express();
const PORT = process.env.PORT || 8080;

sgMail.setApiKey('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'); // Usa tu API Key de SendGrid aquí

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { to, subject, text, html } = req.body;

  const msg = {
    to,
    from: 'derek.vergara.est@tecazuay.edu.ec', // Cambia esto a tu correo electrónico
    subject,
    text,
    html
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).json({ message: 'Email sent successfully' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Error sending email' });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
