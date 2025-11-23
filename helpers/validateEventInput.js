// Caleb Beardall
const ALLOWED_CATEGORIES = ['Social', 'Training', 'Work', 'Church', 'Sports', 'Other'];

function validateEventInput(data) {
    const errors = {};

    const title = data.title?.trim();
    const description = data.description?.trim();
    const location = data.location?.trim();
    const category = data.category?.trim();
    const date = data.date;
    const time = data.time;
    const createdBy = data.createdBy;

    // Title
    if (!title) {
        errors.title = 'Title is required.';
    }

    // Description
    if (!description) {
        errors.description = 'Description is required.';
    }

    // Location
    if (!location) {
        errors.location = 'Location is required.';
    }

    // Date
    if (!date) {
        errors.date = 'Date is required.';
    } else if (isNaN(new Date(date).getTime())) {
        errors.date = 'Date must be a valid date.';
    }

    // Time
    if (!time || time === '') {
        errors.time = 'Time is required.';
    }

    // createdBy
    if (!createdBy || createdBy === '') {
        errors.createdBy = 'Creator ID is required.';
    }

    // Category
    if (!category) {
        errors.category = 'Category is required.';
    } else if (!ALLOWED_CATEGORIES.includes(category)) {
        errors.category = `Category must be one of: ${ALLOWED_CATEGORIES.join(', ')}`;
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

module.exports = validateEventInput;