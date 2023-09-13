const express = require('express');


const router = express.Router();

router.get('/events', async (req, res) => {
    const events = await Events.findAll({ include: ['host', 'attendees'] });
    res.send({ events });
});
  
router.post('/events', async (req, res) => {
    const event = await Events.create(req.body);
    res.send({ event });
});
  
module.exports = router
