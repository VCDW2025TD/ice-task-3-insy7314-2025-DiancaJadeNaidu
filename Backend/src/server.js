// server.js
const fs = require('fs');
const https = require('https');
const app = require('./app');
const connectDB = require('../db/connection');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Load SSL certs
const sslOptions = {
  key: fs.readFileSync('./ssl/privatekey.pem'),
  cert: fs.readFileSync('./ssl/certificate.pem'),
};

// Connect to MongoDB first, then start the server
connectDB().then(() => {
  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(` Secure server running at https://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error(' Could not start server due to DB error:', err);
});