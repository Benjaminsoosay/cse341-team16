// routes/locations.js - Rick Shaw

const router = require('express').Router();

const locationsController = require('../controllers/locations');

// OAuth protection
const { ensureAuth } = require('../middleware/auth')

// ****Unprotected routes****
//get locations
router.get('/', locationsController.getAll);

// get locations by ID
router.get('/:id', locationsController.getOne);


// ****Protected routes ****
// post a new location
router.post('/', ensureAuth, locationsController.createOne);

// modify an existing location by ID
router.put('/:id', ensureAuth, locationsController.updateOne);

// delete a location by ID
router.delete('/:id', ensureAuth, locationsController.deleteOne);

module.exports = router;