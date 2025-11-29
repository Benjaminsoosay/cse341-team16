// Sergio Coria (organizations)
const Organization = require('../models/organizations');
const validateOrganizationInput = require('../helpers/validateOrganizationInput');

const getAll = async (req, res) => {
    //#swagger.tags=['Organizations']
    try {
        const organizations = await Organization.find();
        res.status(200).send(organizations);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const getOne = async (req, res) => {
    //#swagger.tags=['Organizations']
    try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) {
            return res.status(404).send({ message: 'Organization not found' });
        }
        res.status(200).send(organization);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const createOne = async (req, res) => {
    //#swagger.tags=['Organizations']
    const { isValid, errors } = validateOrganizationInput(req.body);
    if (!isValid) {
        return res.status(400).send({ errors });
    }

    try {
        const newOrganization = {
            name: req.body.name.trim(),
            description: req.body.description?.trim(),
            address: req.body.address?.trim(),
            email: req.body.email?.trim(),
            phone: req.body.phone?.trim(),
            website: req.body.website?.trim(),
            createdBy: req.body.createdBy
        };

        const organization = await Organization.create(newOrganization);
        res.status(201).send(organization);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const updateOne = async (req, res) => {
    //#swagger.tags=['Organizations']
    const { isValid, errors } = validateOrganizationInput(req.body);
    if (!isValid) {
        return res.status(400).send({ errors });
    }

    try {
        const updatedOrganization = {
            name: req.body.name.trim(),
            description: req.body.description?.trim(),
            address: req.body.address?.trim(),
            email: req.body.email?.trim(),
            phone: req.body.phone?.trim(),
            website: req.body.website?.trim(),
            createdBy: req.body.createdBy
        };

        const organization = await Organization.findByIdAndUpdate(
            req.params.id,
            updatedOrganization,
            { new: true }
        );

        if (!organization) {
            return res.status(404).send({ message: 'Organization not found' });
        }

        res.status(200).send(organization);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const deleteOne = async (req, res) => {
    //#swagger.tags=['Organizations']
    try {
        const organization = await Organization.findByIdAndDelete(req.params.id);
        if (!organization) {
            return res.status(404).send({ message: 'Organization not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
};
