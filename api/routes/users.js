const express = require('express');

const { usersController } = require('../controllers');
const { fileUpload } = require('../middlewares');


const router = express.Router();

router.post('/signup', fileUpload.single('file'), usersController.createUser);
router.post('/verify', usersController.verifyEmail);
router.post('/signin', usersController.signIn);
router.post('/reset', usersController.resetPassword);
router.post('/signout', usersController.signOut);
router.get('/current', usersController.getCurrent);
router.get('/:userId', usersController.getUserById);
router.patch('/:userId', fileUpload.single('file'), usersController.updateUser);


module.exports = router;
