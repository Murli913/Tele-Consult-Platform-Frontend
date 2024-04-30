//Dependencies: 
//yarn add express cors twilio 

const express = require('express'); 
const cors = require('cors');
const twilio = require('twilio'); 

//twilio requirements -- Texting API 
const accountSid = process.env.accountSid; 
const authToken =  process.env.authToken;
const client = new twilio(accountSid, authToken);

const app = express(); //alias

app.use(cors());

//Welcome Page for the Server 
app.get('/', (req, res) => {
    res.send('Welcome to the Express Server')
})

app.get('/send-text', (req, res) => {
    //Welcome Message
    res.send('Hello to the Twilio Server');

    //_GET Variables
    const recipient = req.query.recipient;
    const textmessage = req.query.textmessage;

    //Send Text
    const recipientPhoneNumber = '+91' + recipient.replace(/\D/g, ''); // Remove non-numeric characters and prepend country code
    client.messages.create({
        body: textmessage,
        to: recipientPhoneNumber,
        from: '+14242519807' // Your Twilio phone number
    }).then((message) => console.log(message.body));
});

app.listen(4000, () => console.log("Running on Port 4000"))
