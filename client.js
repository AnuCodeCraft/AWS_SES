const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');

const hbs = require("nodemailer-express-handlebars");
const log = console.log;
const config = require('./config');
const views = require("./views");
const path = require("path");



// configure AWS SDK
AWS.config.update({
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secret,
    region: config.aws.ses.region
});


// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
SES: new AWS.SES({
  apiVersion: '2010-12-01'
})
});

transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/',
    viewEngine: {
        extName: ".hbs",
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views'),
    extName: ".hbs",

}));

// send some mail
transporter.sendMail({
  from: config.aws.ses.from.default,
  to: "anupriya10031@gmail.com",
  subject: 'Complete Registration!',
  text: 'I hope this message gets sent!',
  template: 'index',
    context: {
        name: 'Anupriya'
    } // send extra values to template
}, (err, data) => {
    if (err) {
        return log("Error occur");
    }
    return log('Email sent!!!');
});