// Sergio Coria - Organizations
function validateOrganizationInput(data) {
    const errors = {};

    const name = data.name?.trim();
    const description = data.description?.trim();
    const address = data.address?.trim();
    const email = data.email?.trim();
    const phone = data.phone?.trim();
    const website = data.website?.trim();
    const createdBy = data.createdBy;

    // Name 
    if (!name) {
        errors.name = 'Name is required.';
    }

    // Address 
    if (!address) {
        errors.address = 'Address is required.';
    }

    // Email 
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = 'Email must be a valid email address.';
        }
    }

    // Website 
    if (website) {
        const urlRegex = /^https?:\/\/.+/;
        if (!urlRegex.test(website)) {
            errors.website = 'Website must be a valid URL (starting with http or https).';
        }
    }

    // createdBy 
    if (!createdBy || createdBy === '') {
        errors.createdBy = 'Creator ID is required.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

module.exports = validateOrganizationInput;
