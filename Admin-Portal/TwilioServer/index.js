// Dependencies
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

// Load environment variables
require('dotenv').config(); // Load environment variables from a .env file

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Express Server');
});

app.get('/send-text', (req, res) => {
  res.send('Hello to the Twilio Server');

  const recipient = req.query.recipient;
  const textmessage = req.query.textmessage;

  const recipientPhoneNumber = '+91' + recipient.replace(/\D/g, '');

  // Use environment variables for account SID and auth token
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  // Create Twilio client with environment variables
  const client = twilio(accountSid, authToken);

  client.messages.create({
    body: textmessage,
    to: recipientPhoneNumber,
    from: '+14242519807' // Your Twilio phone number
  }).then((message) => console.log(message.body));
});

app.listen(4000, () => console.log('Running on Port 4000'));
