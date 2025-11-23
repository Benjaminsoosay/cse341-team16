// Caleb Beardall
const RSVP_STATUSES = ['Going', 'Maybe', 'Not Going'];

function validateRsvpInput(data) {
    const errors = {};

    const userId = data.userId?.trim();
    const status = data.status?.trim();
    const eventId = data.eventId;

    // eventId
    if (!eventId) {
        errors.eventId = 'Event ID is required.';
    }

    // userId
    if (!userId) {
        errors.userId = 'User ID is required.';
    }

    // status
    if (!status) {
        errors.status = 'Status is required.';
    } else if (!RSVP_STATUSES.includes(status)) {
        errors.status = `Status must be one of: ${RSVP_STATUSES.join(', ')}`;
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

module.exports = validateRsvpInput;