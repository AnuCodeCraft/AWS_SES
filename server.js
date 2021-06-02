
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const sesClient = require('./client');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());

app.get('/', (req, res) => {
    // call sesClient to send an email
    sesClient.sendMail('anupriya10031@gmail.com');
    
    res.send('Email is sent!');
});

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});