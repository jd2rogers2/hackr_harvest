const express = require('express');

const { eventsController } = require('../controllers');


const router = express.Router();

router.get('', eventsController.getAllEvents);
router.post('', eventsController.createEvent);
router.get('/:eventId', eventsController.getEventById);
router.patch('/:eventId', eventsController.updateEvent);
router.delete('/:eventId', eventsController.deleteEvent);

module.exports = router;
