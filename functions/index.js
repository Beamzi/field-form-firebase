
const functions = require('firebase-functions');
const {onRequest} = require("firebase-functions/v2/https");
require('dotenv').config();
const nodemailer = require('nodemailer');


// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SENDER_EMAIL_USER, // Your Gmail email address
    pass: process.env.SENDER_EMAIL_PASS // Your Gmail password
  }
});

// HTTP Cloud Function to receive JSON data and send it to an email address
exports.sendJsonToEmail = functions.https.onRequest((req, res) => {
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
    from: process.env.SENDER_EMAIL_USER, // Sender's email address
    to: process.env.RECEIVER_EMAIL, // Recipient's email address
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
