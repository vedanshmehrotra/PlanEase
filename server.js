const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Example route for /api/tasks
app.post('/api/tasks', (req, res) => {
    const { userId, title, category, tag, priority, details } = req.body;

    // Validate input
    if (!userId || !title) {
        return res.status(400).json({ message: 'User ID and Task Title are required.' });
    }

    // Simulate task creation
    const newTask = { userId, title, category, tag, priority, details };
    console.log('Task created:', newTask);

    // Respond with success
    res.status(201).json({ message: 'Task created successfully!', task: newTask });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
