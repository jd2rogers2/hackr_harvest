const express = require('express');

const { usersController } = require('../controllers');
const { fileUpload } = require('../middlewares');


const router = express.Router();

router.post('/signUp', fileUpload.single('file'), usersController.createUser);
router.post('/signIn', usersController.signIn);
// verfiy email?? lambda?!
router.post('/signOut', usersController.signOut);
router.get('/:userId', usersController.getUserById);
router.patch('/:userId', usersController.updateUser);


module.exports = router;
