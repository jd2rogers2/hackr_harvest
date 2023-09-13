const { EventAttendees } = require('../models');


const attendEvent = async (req, res) => {
    const eventAttendee = await EventAttendees.create(req.body);
    res.send({ eventAttendee });
}

const unattendEvent = async (req, res) => {
    res.send();
}


module.exports = {
    attendEvent,
    unattendEvent,
};
