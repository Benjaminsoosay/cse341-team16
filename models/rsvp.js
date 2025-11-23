// Caleb Beardall
const mongoose = require('mongoose');

const RSVP_STATUSES = ['Going', 'Maybe', 'Not Going'];

const rsvpSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: RSVP_STATUSES
    }
});

module.exports = mongoose.model('Rsvp', rsvpSchema);