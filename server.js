require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);

  // Use the environment variable for verification
  if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    return res.send(req.query['hub.challenge']);
  }

  res.sendStatus(403);  // Forbidden if token is incorrect
});

app.listen(3000, () => {
  console.log('Webhook server is running on port 3000');
});
