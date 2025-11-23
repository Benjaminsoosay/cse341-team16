// Caleb Beardall
const Rsvp = require('../models/rsvp');
const validateRsvpInput = require('../helpers/validateRsvpInput');

const getAllForEvent = async (req, res) => {
    //#swagger.tags=['Rsvps']
    const { eventId } = req.params;
    try {
        const rsvps = await Rsvp.find({ eventId });
        res.status(200).send(rsvps);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const getOneForEvent = async (req, res) => {
    //#swagger.tags=['Rsvps']
    const { eventId, id } = req.params;
    try {
        const rsvp = await Rsvp.findOne({ _id: id, eventId });
        if (!rsvp) return res.status(404).send({ message: 'RSVP not found' });
        res.status(200).send(rsvp);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const createForEvent = async (req, res) => {
    //#swagger.tags=['Rsvps']
    const { isValid, errors } = validateRsvpInput({
        ...req.body,
        eventId: req.params.eventId
    });

    if (!isValid) return res.status(400).send({ errors });

    try {
        const rsvp = await Rsvp.create({
            eventId: req.params.eventId,
            userId: req.body.userId.trim(),
            status: req.body.status.trim()
        });

        res.status(201).send(rsvp);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const updateForEvent = async (req, res) => {
    //#swagger.tags=['Rsvps']
    const { eventId, id } = req.params;
    const { isValid, errors } = validateRsvpInput({
        ...req.body,
        eventId
    });

    if (!isValid) return res.status(400).send({ errors });

    try {
        const rsvp = await Rsvp.findOneAndUpdate(
            { _id: id, eventId },
            {
                userId: req.body.userId.trim(),
                status: req.body.status.trim()
            },
            { new: true }
        );

        if (!rsvp) return res.status(404).send({ message: 'RSVP not found' });
        res.status(200).send(rsvp);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const deleteForEvent = async (req, res) => {
    //#swagger.tags=['Rsvps']
    const { eventId, id } = req.params;
    try {
        const rsvp = await Rsvp.findOneAndDelete({ _id: id, eventId });
        if (!rsvp) return res.status(404).send({ message: 'RSVP not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

module.exports = {
    getAllForEvent,
    getOneForEvent,
    createForEvent,
    updateForEvent,
    deleteForEvent
}