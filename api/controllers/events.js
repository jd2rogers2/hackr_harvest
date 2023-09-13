const { Events } = require('../models');


const createEvent = async (req, res) => {
    const event = await Events.create(req.body);
    res.send({ event });
};

const getEventById = async (req, res) => {
    res.send();
};

const getAllEvents = async (req, res) => {
    const events = await Events.findAll({ include: ['host', 'attendees'] });
    res.send({ events });
};

const updateEvent = async (req, res) => {
    res.send();
};
const deleteEvent = async (req, res) => {
    res.send();
};

module.exports = {
    createEvent,
    getEventById,
    getAllEvents,
    updateEvent,
    deleteEvent,
};
