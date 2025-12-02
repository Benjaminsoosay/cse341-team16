//created for sergio
const router = require('express').Router();
const organizationsController = require('../controllers/organizations');

// GET /organizations
router.get('/', organizationsController.getAll);

// GET /organizations/:id
router.get('/:id', organizationsController.getOne);

// POST /organizations
router.post('/', organizationsController.createOne);

// PUT /organizations/:id
router.put('/:id', organizationsController.updateOne);

// DELETE /organizations/:id
router.delete('/:id', organizationsController.deleteOne);

module.exports = router;
