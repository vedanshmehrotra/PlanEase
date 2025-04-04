const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes - These must come BEFORE static file serving
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notes', noteRoutes);

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/PlanEaseDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Root route to serve the about page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../aboutpage.html'));
});

// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // Respond with "No Content"
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
