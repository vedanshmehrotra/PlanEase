const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../utils/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        console.log('Received registration request:', req.body);

        const { username, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('User already exists:', username);
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user
        const user = new User({ username, password });
        await user.save();
        console.log('User registered successfully:', user);

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password, rememberMe } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Set token expiration based on remember me
        const expiresIn = rememberMe ? '30d' : '24h'; // 30 days for remember me, 24 hours for session
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn });
        
        res.json({ token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
