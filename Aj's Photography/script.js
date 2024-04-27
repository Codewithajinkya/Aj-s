document.addEventListener('DOMContentLoaded', function() {
  // Get the button element
  const catalyzerBtn = document.getElementById('catalyzerBtn');

  // Add click event listener to the button
  catalyzerBtn.addEventListener('click', function() {
    // Open a new page when the button is clicked
    window.open('catalyzer.html', '_blank');
  });

  // Add hover effect to related sections when the button is hovered
  catalyzerBtn.addEventListener('mouseenter', function() {
    // Add hover effect to related sections
    document.querySelector('.card:nth-child(1)').classList.add('hover:bg-gray-100');
    document.querySelector('.card:nth-child(2)').classList.add('hover:bg-gray-100');
    document.querySelector('.card:nth-child(3)').classList.add('hover:bg-gray-100');
  });

  // Remove hover effect when mouse leaves the button
  catalyzerBtn.addEventListener('mouseleave', function() {
    // Remove hover effect from related sections
    document.querySelector('.card:nth-child(1)').classList.remove('hover:bg-gray-100');
    document.querySelector('.card:nth-child(2)').classList.remove('hover:bg-gray-100');
    document.querySelector('.card:nth-child(3)').classList.remove('hover:bg-gray-100');
  });
});

// script for Message
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const API_KEY = 'YOUR_WHATSAPP_API_KEY';
const WHATSAPP_NUMBER = 'YOUR_WHATSAPP_NUMBER';

app.post('/send-message', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const response = await axios.post(
      'https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json',
      {
        Body: `New message from ${name} (${email}): ${message}`,
        From: `whatsapp:${WHATSAPP_NUMBER}`,
        To: `whatsapp:RECIPIENT_PHONE_NUMBER`
      },
      {
        auth: {
          username: API_KEY,
          password: 'YOUR_API_SECRET'
        }
      }
    );
    console.log(response.data);
    res.send('Message sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send message');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
