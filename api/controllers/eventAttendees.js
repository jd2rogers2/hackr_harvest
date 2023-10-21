const { EventAttendees } = require('../models');


const attendEvent = async (req, res) => {
    const { userId, eventId } = req.params;
    const eventAttendee = await EventAttendees.create({ userId, eventId });
    res.send({ eventAttendee });
}

const unattendEvent = async (req, res) => {
    const { userId, eventId } = req.params;
    await EventAttendees.destroy({ where: { userId, eventId } });
    res.send();
}


module.exports = {
    attendEvent,
    unattendEvent,
};
