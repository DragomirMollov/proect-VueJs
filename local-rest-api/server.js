const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'your-secret-key'; // Change this to a secure secret key

// Middleware to parse JSON data
app.use(bodyParser.json());

// In-memory user data (replace with a database in a real-world scenario)
const users = {
  "user1": {
    "username": "user1",
    "email": "user1@example.com",
    "password": "hashed_password"
  },
  "user2": {
    "username": "user2",
    "email": "user2@example.com",
    "password": "hashed_password"
  }
};

// API endpoints
app.post('/api/user/register', (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists
  if (users[username]) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Add the new user
  users[username] = {
    username,
    email,
    password: 'hashed_password' // You should hash the password before storing it in a real-world scenario
  };

  // Generate JWT token
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  res.json({ message: 'User registered successfully', token });
});

app.post('/api/user/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
