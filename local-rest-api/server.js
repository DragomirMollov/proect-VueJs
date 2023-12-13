const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
const port = 3000;
const secretKey = 'your-secret-key'; // Change this to a secure secret key

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
  };

// Middleware to parse JSON data
// app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(bodyParser.json()); 
app.use((req, res, next) => {
    // console.log('Request Body:', req.body);
    next();
});



// In-memory user data (replace with a database in a real-world scenario)
const users = [];


// console.log('Server file executed');


// API endpoints
app.post('/api/user/register', async (req, res, next) => {

    // console.log('Received Registration Request:', req.body); 

  const { username, password, repassword } = req.body;
  const saltRounds = 10;
  const user = users.find(user => user.username === username);
  
  // Check if the user already exists
  if (user) {
    return res.status(400).json({ error: 'User already exists' });
  }

  if (password !== repassword) {
    return res.status(400).json({ error: 'Password not matched!' });
  }

  try {
    // Hash the password
    bcrypt.genSalt(saltRounds, async (err, salt) => {
      await bcrypt.hash(password, salt, function(err, hash) {
        // Add the new user with the hashed password
        users.push({
          username,
          password: hash,
        });
        // Log the users array
        console.log('Users after registration:', users);
      })
    })

    // Generate JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    return res.json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error hashing password:', error);
    return  res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/user/login', async (req, res, next) => {
    console.log('Received Login Request:', req.body);
  
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log('Login failed: Invalid credentials');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    console.log('Login successful:', user.username);
  // Check if the user exists and compare hashed passwords
  if (user && await bcrypt.compare(password, user.password)) {
    // Generate JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    return res.json({ message: 'Login successful', token });

  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});