
const functions = require('firebase-functions');
const {onRequest} = require("firebase-functions/v2/https");
require('dotenv').config();
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });


/*
//firebase functions:config:set sender.user="no.reply.fieldformgenerator@gmail.com" sender.password="Qfkwbce$" receiver.user="james.chris.day@gmail.com"

const senderUser = functions.config().sender.user;
const senderPassword = functions.config().sender.password;
const receiverUser = functions.config().receiver.user;
*/


//https://myaccount.google.com/apppasswords
//aumu qvqp yecj lrnk 

// Create a Nodemailer transporter with Gmail SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'no.reply.fieldformgenerator@gmail.com', // Your Gmail email address
    pass: 'aumu qvqp yecj lrnk ' // Your Gmail password or app-specific password
  }
});





// HTTP Cloud Function to receive JSON data and send it to an email address
exports.sendJsonToEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // Check if the request method is POST
    if (req.method !== 'POST') {
      return res.status(400).send('Invalid request method. Only POST requests are allowed.');
    }

    // Extract the JSON data from the request body
    const jsonData = req.body;

    // Check if the request contains JSON data
    if (!jsonData) {
      return res.status(400).send('No JSON data provided.');
    }

    // Define the email message
    const mailOptions = {
      from: 'no.reply.fieldformgenerator@gmail.com', // Sender's email address
      to: 'james.chris.day@gmail.com', // Recipient's email address
      subject: 'Field Form Details From Client',
      text: JSON.stringify(jsonData) // Convert JSON data to a string
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending email.');
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).send('JSON data sent to email successfully.');
      }
    });
  });
});




