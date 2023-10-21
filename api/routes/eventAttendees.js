const express = require('express');
const { eventAttendeesController } = require('../controllers');


const router = express.Router();

router.post('/:userId/:eventId', eventAttendeesController.attendEvent);
router.delete('/:userId/:eventId', eventAttendeesController.unattendEvent);

module.exports = router;
