const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String },
    tag: { type: String, default: 'General' },
    priority: { type: String, default: 'Low' },
    details: { type: String },
    completed: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Task', taskSchema);
