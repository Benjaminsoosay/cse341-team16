// Caleb Beardall
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ['Social', 'Training', 'Work', 'Church', 'Sports', 'Other']
    }
});

module.exports = mongoose.model('Event', eventSchema);