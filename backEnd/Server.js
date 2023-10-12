const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
 
// Sample users data (in-memory)
let users = [
  { id: 1, name: 'John', surname: 'Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane', surname: 'Smith', email: 'jane@example.com', age: 25 },
];
 
// Initialize a counter for generating unique IDs
let userIdCounter = users.length;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Middleware for parsing JSON requests
app.use(bodyParser.json());
 
// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});
 
// Get a specific user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
 
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    res.json(user);
  }
});
 
// Create a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  // Generate a unique ID for the new user
  newUser.id = ++userIdCounter;
  users.push(newUser);
  res.status(201).json(newUser);
});
 
// Update a user by ID
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updateUser = req.body;
  const index = users.findIndex((user) => user.id === userId);
 
  if (index === -1) {
    res.status(404).json({ message: 'User not found' });
  } else {
    users[index] = { ...users[index], ...updateUser };
    res.json(users[index]);
  }
});
 
// Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex((user) => user.id === userId);
 
  if (index === -1) {
    res.status(404).json({ message: 'User not found' });
  } else {
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
  }
});
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});