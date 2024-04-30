//Dependencies: 
//yarn add express cors twilio 

const express = require('express'); 
const cors = require('cors');
const twilio = require('twilio'); 

//twilio requirements -- Texting API 
// const accountSid = 'AC9df5732424b6dd695b57fce8faad5456';
// const authToken = 'f477972279d01c5c2c6ea2c07423b1e8'; 
const client = new twilio(accountSid, authToken);

const app = express(); //alias

app.use(cors()); //Blocks browser from restricting any data

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
