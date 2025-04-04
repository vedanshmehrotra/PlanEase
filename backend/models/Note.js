const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: String,
    alarmDate: String,
    alarmTime: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', noteSchema);
