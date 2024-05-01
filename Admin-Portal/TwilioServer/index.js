// Load environment variables


const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(cors());

// const accountSid = process.env.accountSid;
// const authToken = process.env.authToken;
const accountSid = 'AC9df5732424b6dd695b57fce8faad5456';
const authToken = '9e76b0d0eabaed32e82e6c7bac37240c'; 
const client = new twilio(accountSid, authToken);

app.get('/', (req, res) => {
    res.send('Welcome to the Express Server');
});

app.get('/send-text', (req, res) => {
    res.send('Hello to the Twilio Server');

    const recipient = req.query.recipient;
    const textmessage = req.query.textmessage;

    const recipientPhoneNumber = '+91' + recipient.replace(/\D/g, '');

    client.messages.create({
        body: textmessage,
        to: recipientPhoneNumber,
        from: '+14242519807' // Your Twilio phone number
    }).then((message) => {
        console.log(message.body);
        res.send('Message sent successfully');
    }).catch(error => {
        console.error('Error sending message:', error);
        res.status(500).send('Error sending message');
    });
});

app.listen(4000, () => console.log("Running on Port 4000"));
