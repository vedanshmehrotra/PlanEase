const express = require('express');
const Note = require('../models/Note');
const { verifyToken, extractTokenFromHeader } = require('../utils/auth');

const router = express.Router();

// Middleware to verify authentication
const authenticateUser = async (req, res, next) => {
    const token = extractTokenFromHeader(req);
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    
    const userId = verifyToken(token);
    if (!userId) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    
    req.userId = userId;
    next();
};

// Get all notes for the authenticated user
router.get('/', authenticateUser, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single note by ID
router.get('/:noteId', authenticateUser, async (req, res) => {
    try {
        console.log('Fetching note:', req.params.noteId, 'for user:', req.userId);
        const note = await Note.findOne({ 
            _id: req.params.noteId, 
            userId: req.userId 
        });
        
        if (!note) {
            console.log('Note not found');
            return res.status(404).json({ error: 'Note not found' });
        }
        
        console.log('Note found:', note);
        res.json(note);
    } catch (err) {
        console.error('Error fetching note:', err);
        res.status(500).json({ error: err.message });
    }
});

// Add new note
router.post('/', authenticateUser, async (req, res) => {
    try {
        const note = new Note({
            ...req.body,
            userId: req.userId
        });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update note
router.put('/:noteId', authenticateUser, async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.noteId, userId: req.userId },
            req.body,
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(note);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete note
router.delete('/:noteId', authenticateUser, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.noteId,
            userId: req.userId
        });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
