const express = require('express');
const Task = require('../models/Task');
const { verifyToken, extractTokenFromHeader } = require('../utils/auth');

const router = express.Router();

// Middleware to verify authentication
const authenticateUser = async (req, res, next) => {
    try {
        console.log('Headers received:', req.headers);
        const token = extractTokenFromHeader(req);
        console.log('Extracted token:', token ? 'Token exists' : 'No token found');
        
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ error: 'Authentication required' });
        }
        
        const userId = verifyToken(token);
        console.log('Verified userId:', userId);
        
        if (!userId) {
            console.log('Invalid token');
            return res.status(401).json({ error: 'Invalid token' });
        }
        
        req.userId = userId;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ error: 'Authentication failed' });
    }
};

// Get all tasks for the authenticated user
router.get('/', authenticateUser, async (req, res) => {
    try {
        console.log('Fetching tasks for userId:', req.userId);
        const tasks = await Task.find({ userId: req.userId });
        console.log('Found tasks:', tasks);
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get a single task by ID
router.get('/:taskId', authenticateUser, async (req, res) => {
    try {
        console.log('Fetching task:', req.params.taskId);
        console.log('For userId:', req.userId);
        
        const task = await Task.findOne({
            _id: req.params.taskId,
            userId: req.userId
        });
        
        if (!task) {
            console.log('Task not found');
            return res.status(404).json({ error: 'Task not found' });
        }
        
        console.log('Found task:', task);
        res.json(task);
    } catch (err) {
        console.error('Error fetching task:', err);
        res.status(500).json({ error: err.message });
    }
});

// Add new task
router.post('/', authenticateUser, async (req, res) => {
    try {
        console.log('Creating task with data:', req.body);
        console.log('UserId from request:', req.userId);
        
        // Validate required fields
        if (!req.body.title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        
        const task = new Task({
            title: req.body.title,
            category: req.body.category,
            tag: req.body.tag || 'General',
            priority: req.body.priority || 'Low',
            details: req.body.details,
            userId: req.userId
        });
        
        console.log('Task object created:', task);
        const savedTask = await task.save();
        console.log('Task saved successfully:', savedTask);
        
        res.status(201).json(savedTask);
    } catch (err) {
        console.error('Error creating task:', err);
        console.error('Error details:', {
            name: err.name,
            message: err.message,
            stack: err.stack
        });
        res.status(400).json({ error: err.message });
    }
});

// Update task
router.put('/:taskId', authenticateUser, async (req, res) => {
    try {
        console.log('Updating task:', req.params.taskId);
        console.log('Update data:', req.body);
        
        const task = await Task.findOneAndUpdate(
            { _id: req.params.taskId, userId: req.userId },
            req.body,
            { new: true }
        );
        
        if (!task) {
            console.log('Task not found');
            return res.status(404).json({ error: 'Task not found' });
        }
        
        console.log('Task updated successfully:', task);
        res.json(task);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(400).json({ error: err.message });
    }
});

// Delete task
router.delete('/:taskId', authenticateUser, async (req, res) => {
    try {
        console.log('Deleting task:', req.params.taskId);
        
        const task = await Task.findOneAndDelete({
            _id: req.params.taskId,
            userId: req.userId
        });
        
        if (!task) {
            console.log('Task not found');
            return res.status(404).json({ error: 'Task not found' });
        }
        
        console.log('Task deleted successfully:', task);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
