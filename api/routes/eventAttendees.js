const express = require('express');
const { eventAttendeesController } = require('../controllers');


const router = express.Router();

router.post('', eventAttendeesController.attendEvent);
router.delete('', eventAttendeesController.unattendEvent);

module.exports = router;
