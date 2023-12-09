// Third-party imports
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Setup environment variables
dotenv.config();

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Unhandled exception 💥! Application shutting down!');
  console.log(err.name, err.message);
  process.exit(1);
});

// Server setup
const app = require('./app');

// Database setup
const PORT = process.env.PORT || 3000;
const DB = process.env.MONGODB_URL;

mongoose
  .connect(DB)
  .then(() => {
    console.log('MongoDB connection successful! 🔥');
  })
  .catch((err) => {
    console.log(`Error found! Error: ${err}`);
  });

const server = app.listen(PORT, () => {
  console.log(`Application running on Express.js on port ${PORT}! 👍`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection 💥! Application shutting down!');
  console.log(err.name, err.message);

  // Finish all requests that are still pending
  server.close(() => {
    process.exit(1);
  });
});
