const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change this to the desired port

// Middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit based on your requirements
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle POST requests from Alertmanager
app.post('/webhook', (req, res) => {
  const alertData = req.body;

  // Print the received data to the console
  console.log('Received Alert Data:');
  console.log(JSON.stringify(alertData, null, 2));

  res.status(200).send('Alert received successfully');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
