/** 
 * Complex Code Example
 *
 * This code demonstrates an elaborate and complex example of a web application in JavaScript.
 * It includes multiple functions, classes, and asynchronous operations, showcasing the usage of 
 * various JavaScript concepts and libraries.
 *
 * Filename: complex_code_example.js
 */

// Import libraries and modules
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const moment = require('moment');

// Create Express App
const app = express();

// Use middleware
app.use(bodyParser.json());

/**
 * Class representing a User.
 * It has properties like name, email, and age.
 * Users are retrieved and stored in a database.
 */
class User {
  constructor(name, email, age) {
    this.name = name;
    this.email = email;
    this.age = age;
  }

  /**
   * Save the user to the database.
   * @returns {Promise} - A promise that resolves when the user is saved.
   */
  saveToDatabase() {
    return new Promise((resolve, reject) => {
      // Simulating a database save operation
      setTimeout(() => {
        const user = { name: this.name, email: this.email, age: this.age };
        fs.appendFileSync('users.txt', JSON.stringify(user) + '\n');
        resolve();
      }, 1000);
    });
  }

  /**
   * Fetch user's latest activity from API.
   * @returns {Promise} - A promise that resolves with the user's activity.
   */
  fetchActivity() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get('https://api.example.com/activity');
        resolve(response.data.activity);
      } catch (error) {
        reject(error);
      }
    });
  }
}

/**
 * Handler for HTTP POST requests to create a new user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
app.post('/createUser', async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const user = new User(name, email, age);
    await user.saveToDatabase();
    const activity = await user.fetchActivity();
  
    res.status(201).json({ user, activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

/**
 * Handler for HTTP GET requests to retrieve users from the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
app.get('/users', (req, res) => {
  try {
    const users = fs.readFileSync('users.txt', 'utf8').trim().split('\n');
    const formattedUsers = users.map((user) => JSON.parse(user));
  
    res.status(200).json(formattedUsers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users.' });
  }
});

/**
 * Middleware to log incoming requests.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
const requestLogger = (req, res, next) => {
  console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} - ${req.method} ${req.originalUrl}`);
  next();
};

// Apply middleware
app.use(requestLogger);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000.');
});

// Additional code...

// ...

// ...

// ...

// End of code.