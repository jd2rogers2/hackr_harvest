const express = require('express');

const { usersController } = require('../controllers');
const { fileUpload } = require('../middlewares');


const router = express.Router();

router.post('/signup', fileUpload.single('file'), usersController.createUser);
router.post('/verify', usersController.verifyEmail);
router.post('/reset', usersController.resetPassword);
router.post('/signout', usersController.signOut);
router.post('/current', usersController.getCurrent); // also handle signin
router.get('/:userId', usersController.getUserById);
router.patch('/:userId', fileUpload.single('file'), usersController.updateUser);


module.exports = router;
