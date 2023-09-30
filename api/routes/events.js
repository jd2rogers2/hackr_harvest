const express = require('express');

const { eventsController } = require('../controllers');
const { fileUpload } = require('../middlewares');


const router = express.Router();

router.get('', eventsController.getAllEvents);
router.post('', fileUpload.single('file'), eventsController.createEvent);
router.get('/:eventId', eventsController.getEventById);
router.patch('/:eventId', eventsController.updateEvent);
router.delete('/:eventId', eventsController.deleteEvent);

module.exports = router;
