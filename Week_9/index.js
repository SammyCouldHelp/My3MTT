const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Root URL response ("/")
app.get('/', (req, res) => {
  res.send('Welcome to my web server!');
});

// Fake user data
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// GET endpoint to return the list of users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST endpoint to add a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  
  res.status(201).json(newUser);
});

// Catch-all route for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
