require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware - allows our server to read JSON data
app.use(express.json());
app.use(logger);
app.use(express.static('public'));

// Routes
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

// Test route - Home
app.get('/', (req, res) => {
  res.send('Task Manager API is running!');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(500).json({ message: 'Something went wrong on the server' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});